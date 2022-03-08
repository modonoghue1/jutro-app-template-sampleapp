"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var fs = require('fs');

var includesFilterFunction = filter => meta => filter.split(',').map(filterRule => filterRule.split('=')).some(_ref => {
  var [metaProp, metaMatch] = _ref;
  return meta[metaProp] === metaMatch;
});

var excludesFilterFunction = filter => meta => filter.split(',').map(filterRule => filterRule.split('=')).every(_ref2 => {
  var [metaProp, metaMatch] = _ref2;
  return meta[metaProp] !== metaMatch;
});

var fixtureFilters = [];
var testsFilters = [];

function splitCommaSeparatedValueStringIntoArray(valueWithCommaSeparatedListed) {
  return valueWithCommaSeparatedListed.includes(",") ? valueWithCommaSeparatedListed.split(",") : valueWithCommaSeparatedListed.split();
}

function processBrowserArgument(browserArg, isHeadless, osCompatibility) {
  var browserList = splitCommaSeparatedValueStringIntoArray(browserArg);

  if (isHeadless === true) {
    browserList = browserList.map(browserItem => {
      return browserItem === 'chrome' && osCompatibility ? browserItem.concat(':headless --force-color-profile="srgb" --disable-font-subpixel-positioning --font-render-hinting=none --disable-gpu --window-size=1920,10000') : browserItem.concat(':headless');
    });
  }

  return browserList;
}

function processFilters(runParams) {
  if (runParams.includeFixtures) {
    fixtureFilters.push(includesFilterFunction(runParams.includeFixtures));
  }

  if (runParams.excludeFixtures) {
    fixtureFilters.push(excludesFilterFunction(runParams.excludeFixtures));
  }

  if (runParams.includeTests) {
    testsFilters.push(includesFilterFunction(runParams.includeTests));
  }

  if (runParams.excludeTests) {
    testsFilters.push(excludesFilterFunction(runParams.excludeTests));
  }
}

function processPortsArgument(portsArgument) {
  var throwError = () => {
    console.error('Unable to parse valid ports from value ', portsParam);
    throw err;
  };

  var ports = [1337, 1338];

  if (portsArgument) {
    try {
      ports = portsArgument.split(',').map(port => parseInt(port));
    } catch (err) {
      throwError();
    }
  }

  if (ports.length !== 2 || ports.some(port => isNaN(port))) {
    throwError();
  }

  return ports;
}

function runTestCafe(_x, _x2, _x3, _x4, _x5) {
  return _runTestCafe.apply(this, arguments);
}

function _runTestCafe() {
  _runTestCafe = (0, _asyncToGenerator2.default)(function* (testsLocation, testSuiteLocation, reporters, runParams, testCafeInterface) {
    var ports = processPortsArgument(runParams.ports);
    var testCafe = yield testCafeInterface('localhost', ...ports);
    var browsers = processBrowserArgument(runParams.browser, runParams.headless, runParams.osCompatibility);
    var screenshotPath = runParams.visualTestsSnapshotLocation ? runParams.reporterOutput : runParams.reporterOutput + "/screenshots/";
    var videoPath = runParams.visualTestsSnapshotLocation ? runParams.reporterOutput : runParams.reporterOutput + "/videos/";
    var failedCount;
    var finalReporters = [];
    var testSuiteName = runParams.testSuite;

    if (testSuiteName !== 'None' && testSuiteName !== undefined) {
      try {
        var testSuiteParameters = JSON.parse(fs.readFileSync(testSuiteLocation + testSuiteName + '.json'));
        runParams.feature = testSuiteParameters.features;
        runParams.cucumberTags = testSuiteParameters.tags;
        runParams.glue = testSuiteParameters.glue;
      } catch (err) {
        console.error('Not able read configuration for testSuite=' + testSuiteName);
        throw err;
      }
    }

    finalReporters.push(reporters);

    if (runParams.cucumberTags) {
      finalReporters.push({
        name: 'cucumber-json',
        output: runParams.reporterOutput + '/report.json'
      });
    } else {
      finalReporters.push({
        name: 'xunit',
        output: runParams.reporterOutput + '/result.xml'
      }, {
        name: 'json',
        output: runParams.reporterOutput + '/result.json'
      }, {
        name: 'junit',
        output: runParams.reporterOutput + '/result_for_xray.xml'
      }, {
        name: 'html',
        output: runParams.reporterOutput + '/result.html'
      });
    }

    console.log("Reporters used: " + JSON.stringify(finalReporters));

    try {
      var runner = runParams.liveMode === true ? testCafe.createLiveModeRunner() : testCafe.createRunner();
      runner.src(testsLocation).browsers(browsers).reporter(finalReporters).screenshots(screenshotPath, true, runParams.screenshotsPathPattern);

      if (runParams.videoPathPattern) {
        var finalVideoPattern;
        runParams.videoPathPattern === true ? finalVideoPattern = "${DATE}_${TIME}/${TEST_INDEX}/${USERAGENT}/${FILE_INDEX}.mp4" : finalVideoPattern = runParams.videoPathPattern;
        runner.video(videoPath, {
          failedOnly: true,
          pathPattern: finalVideoPattern
        });
      }

      if (runParams.cucumberTags) {
        runner.tags([runParams.cucumberTags]);
      }

      if (runParams.clientScripts) {
        runner.clientScripts(runParams.clientScripts.split(','));
      }

      processFilters(runParams);

      if (fixtureFilters.length || testsFilters.length) {
        runner.filter((testName, fixtureName, fixturePath, testMeta, fixtureMeta) => {
          return fixtureFilters.every(filter => filter(fixtureMeta)) && testsFilters.every(filter => filter(testMeta));
        });
      }

      failedCount = yield runner.run({
        quarantineMode: runParams.quarantineMode,
        stopOnFirstFail: runParams.stopOnFirstFail,
        skipJsErrors: runParams.skipJsErrors,
        skipUncaughtErrors: runParams.skipUncaughtErrors,
        concurrency: runParams.concurrency,
        selectorTimeout: runParams.selectorTimeout,
        assertionTimeout: runParams.assertionTimeout,
        pageLoadTimeout: runParams.pageLoadTimeout,
        disablePageCaching: runParams.disablePageCaching,
        debugOnFail: runParams.debugOnFail,
        speed: runParams.speed,
        disableMultipleWindows: runParams.speed,
        retryTestPages: runParams.retryTestPages,
        ajaxRequestTimeout: runParams.ajaxRequestTimeout,
        pageRequestTimeout: runParams.pageRequestTimeout,
        browserInitTimeout: runParams.browserInitTimeout,
        disableScreenshots: runParams.disableScreenshots,
        debugMode: runParams.debugMode
      });
    } finally {
      console.log('Closing testcafe runner: ' + failedCount);
      yield testCafe.close();
    }

    return failedCount;
  });
  return _runTestCafe.apply(this, arguments);
}

function closeProcessWithErrorIfFailsExist(failedCount) {
  if (failedCount) {
    console.log('Tests failed: ' + failedCount);
    console.log('Closing runner process.');
    process.exit(1);
  } else {
    console.log('Closing runner process.');
    process.exit(0);
  }
}

module.exports = {
  splitCommaSeparatedValueStringIntoArray,
  runTestCafe,
  closeProcessWithErrorIfFailsExist,
  processPortsArgument
};