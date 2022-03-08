"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.promptUpdateConsumerConfig = promptUpdateConsumerConfig;

var _path = require("path");

var _promptsWrapper = require("./promptsWrapper");

var _questionsForAppConfig = require("./questionsForAppConfig");

const projectNameQuestions = _questionsForAppConfig.questionsForAppConfig.projectNameQuestions,
      projectPathQuestions = _questionsForAppConfig.questionsForAppConfig.projectPathQuestions,
      oktaQuestions = _questionsForAppConfig.questionsForAppConfig.oktaQuestions,
      routerQuestions = _questionsForAppConfig.questionsForAppConfig.routerQuestions,
      mixPanelQuestions = _questionsForAppConfig.questionsForAppConfig.mixPanelQuestions,
      googleAnalyticsQuestions = _questionsForAppConfig.questionsForAppConfig.googleAnalyticsQuestions,
      dataDogQuestions = _questionsForAppConfig.questionsForAppConfig.dataDogQuestions,
      zipkinQuestions = _questionsForAppConfig.questionsForAppConfig.zipkinQuestions;

async function promptUpdateConsumerConfig({
  applicationDirectory,
  applicationName,
  enableApplicationName = false,
  enableMixPanel = false,
  enableGoogleAnalytics = false,
  enableRouter = false,
  enableOkta = false,
  enableDataDog = false,
  enableZipkin = false
}) {
  const _ref = enableApplicationName ? await (0, _promptsWrapper.prompt)(projectNameQuestions(applicationName)) : {},
        chosenApplicationName = _ref.applicationName;

  const questions = [...projectPathQuestions(chosenApplicationName ? (0, _path.join)(applicationDirectory, chosenApplicationName) : applicationDirectory), ...enableQuestions(enableOkta, oktaQuestions), ...enableQuestions(enableRouter, routerQuestions), ...enableQuestions(enableMixPanel, mixPanelQuestions), ...enableQuestions(enableDataDog, dataDogQuestions), ...enableQuestions(enableGoogleAnalytics, googleAnalyticsQuestions), ...enableQuestions(enableZipkin, zipkinQuestions)];
  return enableApplicationName ? {
    applicationName: chosenApplicationName,
    ...(await (0, _promptsWrapper.prompt)(questions))
  } : (0, _promptsWrapper.prompt)(questions);
}

function enableQuestions(questionTypeToEnable, questionSet) {
  return [...(questionTypeToEnable ? questionSet : [])];
}
//# sourceMappingURL=promptUpdateConsumerConfig.js.map