"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PcfListView = void 0;

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _testcafe = require("testcafe");

var _PcfComponent = _interopRequireDefault(require("./PcfComponent"));

// ToDo: Implement column menu support for ListView
// import { PcfLVColumnsMenuItem } from "./PcfLVColumnsMenuItem";
class ListView extends _PcfComponent.default {
  constructor(cssSelector) {
    for (var _len = arguments.length, options = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      options[_key - 1] = arguments[_key];
    }

    super(cssSelector, options);
    this.pagingWidget = this.component.find('.gw-IteratorPagingWidget'); // ToDo: Implement column menu support for ListView
    // this.lvColumnsMenu = new PcfLVColumnsMenuItem(cssSelector);
  }

  getContentRows() {
    var _this = this;

    return (0, _asyncToGenerator2.default)(function* () {
      var rowFilter = "not(.gw-header-row):not(.gw-footer-row):not(.gw-isSmartHeader)";
      return _this.component.find("tr:" + rowFilter); // This failed for: Create policy in Policy Center and then create new Claim for policy from Claim Center
      // return this.component.find("tr.gw-standard-row");
    })();
  }

  getContentRow(rowIndex) {
    var _this2 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      var rows = yield _this2.getContentRows(); // ToDo: See if I can chain this if I do await?

      return rows.nth(rowIndex);
    })();
  }

  getCellsForContentRow(rowIndex) {
    var _this3 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      var row = yield _this3.getContentRow(rowIndex);
      return row.find('td');
    })();
  }

  getHeaderRow() {
    var _this4 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      return _this4.component.find("tr.gw-header-row");
    })();
  }

  getFooterRow() {
    var _this5 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      return _this5.component.find("tr.gw-footer-row");
    })();
  }

  getHeaderColumns() {
    var _this6 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      var headerRow = yield _this6.getHeaderRow();
      return headerRow.find("td");
    })();
  }

  getHeaderCell(columnIndex) {
    var _this7 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      var headerRow = yield _this7.getHeaderRow();
      return headerRow.find("td").nth(columnIndex);
    })();
  }

  getFooterCell(columnIndex) {
    var _this8 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      var footerRow = yield _this8.getFooterRow();
      return footerRow.find("td").nth(columnIndex);
    })();
  }

  getCell(rowIndex, columnIndex) {
    var _this9 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      var columns = yield _this9.getCellsForContentRow(rowIndex);
      return columns.nth(columnIndex);
    })();
  }

  getTextFromCell(rowIndex, columnIndex) {
    var _this10 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      var cell = yield _this10.getCell(rowIndex, columnIndex);
      return cell.innerText;
    })();
  }

  getCellByColumnName(rowIndex, columnName) {
    var _this11 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      return yield _this11.getCell(rowIndex, yield _this11.getColumnIndexByName(columnName));
    })();
  }

  getTextFromCellByColumnName(rowIndex, columnName) {
    var _this12 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      var cell = yield _this12.getCellByColumnName(rowIndex, columnName);
      return cell.innerText;
    })();
  }
  /**
   * ToDo: File a story to add JavaScript doc
   * @param columnName
   * @returns {Promise<undefined|number>}
   */


  getColumnIndexByName(columnName) {
    var _this13 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      var headerColumns = yield _this13.getHeaderColumns();

      for (var i = 0; i < (yield headerColumns.count); i++) {
        var labelElement = yield headerColumns.nth(i).find('.gw-label');

        if ((yield labelElement.exists) && (yield labelElement.innerText) === columnName) {
          return i;
        }
      }

      console.error('Failed to find column with name "' + columnName + "'");
      return undefined;
    })();
  }

  getRowsByColumnValue(columnName, columnValue) {
    var _this14 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      var allRows = yield _this14.getContentRows();
      var rowsWithValue = [];

      for (var i = 0; i < (yield allRows.count); i++) {
        var cell = yield _this14.getCellByColumnName(i, columnName);

        if ((yield cell.innerText) === columnValue) {
          rowsWithValue.push(allRows.nth(i));
        }
      }

      return rowsWithValue;
    })();
  }
  /**
   * Return a list of cells from one column based on the cell values from another column.
   *
   * @param columnToCheck Check if this column contains the target value
   * @param valueToCheck The target column value to check for
   * @param columnToReturn The column containing the cell to return
   * @returns {Promise<[]>} A list containing cells from {@columnToReturn} where the value of
   *      {@columnToCheck} equals {@valueToCheck}
   */


  getCellsByColumnValue(columnToCheck, valueToCheck, columnToReturn) {
    var _this15 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      var allRows = yield _this15.getContentRows();
      var cellsWithValue = [];

      for (var i = 0; i < (yield allRows.count); i++) {
        var cell = yield _this15.getCellByColumnName(i, columnToCheck);

        if ((yield cell.innerText) === valueToCheck) {
          cellsWithValue.push(yield _this15.getCellByColumnName(i, columnToReturn));
        }
      }

      return cellsWithValue;
    })();
  }

  clickOnCell(rowIndex, columnIndex) {
    var _this16 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      var cell = yield _this16.getCell(rowIndex, columnIndex);
      var buttonCell = yield cell.find('div').withAttribute('role', 'button');
      yield _testcafe.t.click((yield buttonCell.exists) ? buttonCell : cell);
    })();
  }

  clickOnCellByColumnName(rowIndex, columnName) {
    var _this17 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      var columnIndex = yield _this17.getColumnIndexByName(columnName);
      yield _this17.clickOnCell(rowIndex, columnIndex);
    })();
  }

  orderTableByColumnAscending(columnIndex) {
    var _this18 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      var headerColumn = yield _this18.getHeaderCell(columnIndex);
      var maxTimesToClickHeader = 2;
      var numberOfTimesClicked = 0;

      while (!(yield headerColumn.find("div.gw-HeaderCellValueWidget").hasClass("gw-header--sorted--ASCENDING")) && numberOfTimesClicked < maxTimesToClickHeader) {
        yield _testcafe.t.click(headerColumn);
        numberOfTimesClicked++;
      }
    })();
  }

  orderTableByColumnDescending(columnIndex) {
    var _this19 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      var headerColumn = yield _this19.getHeaderCell(columnIndex);
      var maxTimesToClickHeader = 2;
      var numberOfTimesClicked = 0;

      while (!(yield headerColumn.find("div.gw-HeaderCellValueWidget").hasClass("gw-header--sorted--DESCENDING")) && numberOfTimesClicked < maxTimesToClickHeader) {
        yield _testcafe.t.click(headerColumn);
        numberOfTimesClicked++;
      }
    })();
  }

  rowCount() {
    var _this20 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      var contentRows = yield _this20.getContentRows();
      return contentRows.count;
    })();
  }

  isEmpty() {
    var _this21 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      return (yield _this21.rowCount()) === 0;
    })();
  } // ToDo: Does hasFocus() make sense for ListView?
  // async hasFocus() { return this.component.find('.gw-action--inner').hasClass('gw-focus'); }
  // ToDo: Pagination API?
  // async getPagingWidget() { return this.pagingWidget; }
  // ToDo: Potential APIs to add:
  // containsCellWithValue(value[, columnName])
  // getCellsWithValue(value[, columnName])
  // clickCellByColumnValue()? (covers important use case)

  /*
      // ToDo: Implement column menu support for ListView
      async hasLVColumnsMenu() {
          console.log('this.lvColumnsMenu.isAvailable(): ' + await this.lvColumnsMenu.isAvailable());
          // console.log('this.lvColumnsMenu.visible: ' + await t.expect(this.lvColumnsMenu.visible).ok());
          // console.log('this.lvColumnsMenu.exists: ' + await t.expect(this.lvColumnsMenu.exists).ok());
          // ToDo: Figure out how to make this work
          // return await this.component.withAttribute('class', 'gw-ListView--UI--columns-menu').exists;
          return await this.component.find('div.gw-ListView--UI--columns-menu') !== undefined;
      }
  
      async getLVColumnsMenu() { return this.lvColumnsMenu; }
  
      async toggleColumnGroupedBy() { await this.lvColumnsMenu.toggleColumnGroupedBy(); }
  
      async toggleShowHideColumn(columnName) {
          await this.lvColumnsMenu.expand();
          await this.openSubMenu(columnName);
      }
  
      // ToDo: Related to column menu support
      async isColumnHidden(columnName) { }
  */


}

var PcfListView = function pcfListViewFactory(selector) {
  for (var _len2 = arguments.length, options = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    options[_key2 - 1] = arguments[_key2];
  }

  return new ListView(selector, ...options);
};

exports.PcfListView = PcfListView;