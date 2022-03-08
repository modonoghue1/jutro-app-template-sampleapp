"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Pseudolizer = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/createClass"));

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _glob = _interopRequireDefault(require("glob"));

var _expander = require("./expander");

var _sherlockHasher = require("./sherlock-hasher");

const DEFAULT_OUTPUT_FILENAME = '<filename>_yy.<extension>';
const DEFAULT_TYPE = 'BOTH';

function getOutputFilePath(originalFilePath, outputFileName) {
  const dir = _path.default.dirname(originalFilePath);

  const ext = _path.default.extname(originalFilePath);

  const base = _path.default.basename(originalFilePath, ext);

  let outputFilePath = outputFileName.replace(/<filename>/, base);
  outputFilePath = outputFilePath.replace(/.<extension>/, ext);
  return _path.default.join(dir, outputFilePath);
}

let Pseudolizer = function () {
  function Pseudolizer() {
    (0, _classCallCheck2.default)(this, Pseudolizer);
    this.pseudoType = Object.freeze({
      EXPANSION: 'EXPANSION',
      SHERLOCK: 'SHERLOCK',
      BOTH: 'BOTH'
    });
    this.selectedType = DEFAULT_TYPE;
    this.outputFileName = DEFAULT_OUTPUT_FILENAME;
    this.filePathPatterns = [];
  }

  (0, _createClass2.default)(Pseudolizer, [{
    key: "loadByConfig",
    value: function loadByConfig(configFilePath) {
      const obj = JSON.parse(_fs.default.readFileSync(configFilePath, 'utf-8'));

      if (obj.pseudoType) {
        this.setPseudoType(obj.pseudoType);
      }

      if (obj.outputFileName) {
        this.setOutputFileName(obj.outputFileName);
      }

      if (obj.patterns) {
        this.setFilePathPatterns(obj.patterns);
      }
    }
  }, {
    key: "pseudolizeFiles",
    value: function pseudolizeFiles() {
      if (!this.filePathPatterns || !Array.isArray(this.filePathPatterns) || !this.filePathPatterns.length) {
        throw new Error('No valid filePathPatterns provided!');
      }

      if (!this.isValidPseudoType(this.selectedType)) {
        throw new Error('PseudoType is empty or not supported!');
      }

      if (!this.outputFileName) {
        throw new Error('No valid outputFileName provided!');
      }

      try {
        for (const pattern of this.filePathPatterns) {
          const files = _glob.default.sync(pattern);

          this.pseudolizeSpecificFiles(files, this.selectedType, this.outputFileName);
        }
      } catch (e) {
        console.log('No matching files for the patterns');
        console.error(e);
      }
    }
  }, {
    key: "pseudolizeKeySource",
    value: function pseudolizeKeySource(key, source) {
      return this.pseudolizeKeySourceInternal(key, source, this.selectedType);
    }
  }, {
    key: "setPseudoType",
    value: function setPseudoType(pseudoType) {
      if (!this.isValidPseudoType(pseudoType)) {
        throw new Error('PseudoType is empty or not supported!');
      }

      this.selectedType = pseudoType.toUpperCase();
    }
  }, {
    key: "setOutputFileName",
    value: function setOutputFileName(outputFileName) {
      this.outputFileName = outputFileName;
    }
  }, {
    key: "setFilePathPatterns",
    value: function setFilePathPatterns(filePathPatterns) {
      if (!filePathPatterns || !Array.isArray(filePathPatterns) || !filePathPatterns.length) {
        throw new Error('filePathPatterns need to be an array');
      }

      this.filePathPatterns = filePathPatterns;
    }
  }, {
    key: "reset",
    value: function reset(resetFilePatterns) {
      this.setPseudoType(DEFAULT_TYPE);
      this.setOutputFileName(DEFAULT_OUTPUT_FILENAME);

      if (resetFilePatterns) {
        this.filePathPatterns = [];
      }
    }
  }, {
    key: "isValidPseudoType",
    value: function isValidPseudoType(type) {
      if (!type || !Object.prototype.hasOwnProperty.call(this.pseudoType, type.toUpperCase())) {
        return false;
      }

      return true;
    }
  }, {
    key: "pseudolizeKeySourceInternal",
    value: function pseudolizeKeySourceInternal(key, source, type) {
      let paddedSource = source;
      let sherlock = '';

      if (type === this.pseudoType.SHERLOCK || type === this.pseudoType.BOTH) {
        sherlock = `${(0, _sherlockHasher.generateSherlock)(key, source)}_`;
      }

      if (type === this.pseudoType.EXPANSION || type === this.pseudoType.BOTH) {
        paddedSource = (0, _expander.addPadding)(source);
      }

      return `[${sherlock}${paddedSource}]`;
    }
  }, {
    key: "convertToPseudoSherlock",
    value: function convertToPseudoSherlock(jsonObj, type) {
      for (const key in jsonObj) {
        if (jsonObj[key]) {
          const source = jsonObj[key];
          const sourceTyoeOf = typeof source;

          if (sourceTyoeOf === 'string') {
            jsonObj[key] = this.pseudolizeKeySourceInternal(key, source, type);
          } else if (sourceTyoeOf === 'object') {
            this.convertToPseudoSherlock(source, type);
          }
        }
      }

      return jsonObj;
    }
  }, {
    key: "pseudolizeSpecificFiles",
    value: function pseudolizeSpecificFiles(files, pseudoType, outputFileName) {
      files.forEach(filePath => {
        const content = JSON.parse(_fs.default.readFileSync(filePath, 'utf8'));
        const pseudoContent = this.convertToPseudoSherlock(content, pseudoType);
        const outputFilePath = getOutputFilePath(filePath, outputFileName);

        _fs.default.writeFileSync(outputFilePath, JSON.stringify(pseudoContent, null, 2), 'utf8');
      });
    }
  }]);
  return Pseudolizer;
}();

exports.Pseudolizer = Pseudolizer;
//# sourceMappingURL=Pseudolizer.js.map