"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertDomElementToArray = convertDomElementToArray;
exports.verifyNonEmptyCells = verifyNonEmptyCells;

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _testcafe = require("testcafe");

function convertDomElementToArray(_x) {
  return _convertDomElementToArray.apply(this, arguments);
}
/**
 * This verification helper function assumes there is a contiguous group of non-empty
 * cells in the input list of cell values, defined by minIndex and maxIndex.
 *
 * @param cellValues A list of cells from a row (derived from find("td"))
 * @param maxIndex The maximum index of cells to check (inclusive)
 * @param minIndex The minimum index of cells to check (inclusive)
 */


function _convertDomElementToArray() {
  _convertDomElementToArray = (0, _asyncToGenerator2.default)(function* (domElement) {
    var arrayResult = [];

    if ((yield domElement.count) && (yield domElement.count) > 0) {
      for (var i = 0; i < (yield domElement.count); i++) {
        arrayResult.push(yield domElement.nth(i));
      }
    } else {
      arrayResult.push(yield domElement);
    }

    return arrayResult;
  });
  return _convertDomElementToArray.apply(this, arguments);
}

function verifyNonEmptyCells(_x2) {
  return _verifyNonEmptyCells.apply(this, arguments);
}

function _verifyNonEmptyCells() {
  _verifyNonEmptyCells = (0, _asyncToGenerator2.default)(function* (cellValues) {
    var minIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var maxIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : cellValues.count - 1;

    for (var i = minIndex; i <= maxIndex; i++) {
      yield _testcafe.t.expect(cellValues.nth(i).textContent).notEql("");
    }
  });
  return _verifyNonEmptyCells.apply(this, arguments);
}