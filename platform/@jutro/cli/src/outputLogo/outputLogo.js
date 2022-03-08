"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.outputLogo = void 0;

var _figlet = _interopRequireDefault(require("figlet"));

const outputLogo = () => {
  console.log(_figlet.default.textSync('Jutro', {
    font: 'Ogre'
  }));
};

exports.outputLogo = outputLogo;
//# sourceMappingURL=outputLogo.js.map