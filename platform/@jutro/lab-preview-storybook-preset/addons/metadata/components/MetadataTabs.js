"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MetadataTabs = void 0;

var _react = _interopRequireDefault(require("react"));

var _components = require("@storybook/components");

var _theming = require("@storybook/theming");

const StyledSyntaxHighlighter = (0, _theming.styled)(_components.SyntaxHighlighter)(() => ({
  flex: 1
}));
const SyntaxHighlighterFullHeight = (0, _theming.styled)(_components.SyntaxHighlighter)(() => ({
  height: '100%'
}));

const MetadataTabs = ({
  data
}) => {
  var _data$;

  if (data.length === 1) {
    return _react.default.createElement(StyledSyntaxHighlighter, {
      language: "json",
      copyable: true,
      showLineNumbers: true,
      padded: true
    }, data[0].metadata);
  }

  return _react.default.createElement(_components.TabsState, {
    initial: (_data$ = data[0]) === null || _data$ === void 0 ? void 0 : _data$.title,
    backgroundColor: "rgba(0,0,0,.05)",
    absolute: true
  }, data.map(({
    title,
    metadata
  }, index) => _react.default.createElement("div", {
    id: title,
    key: index,
    title: title,
    color: "#006083"
  }, ({
    key,
    active
  }) => {
    if (!active) {
      return null;
    }

    return _react.default.createElement(SyntaxHighlighterFullHeight, {
      language: "json",
      copyable: true,
      showLineNumbers: true,
      padded: true,
      key: key
    }, metadata);
  })));
};

exports.MetadataTabs = MetadataTabs;
MetadataTabs.__docgenInfo = {
  "description": "",
  "methods": [],
  "displayName": "MetadataTabs",
  "props": {
    "data": {
      "required": true,
      "tsType": {
        "name": "Array",
        "elements": [{
          "name": "MetadataData"
        }],
        "raw": "Array<MetadataData>"
      },
      "description": ""
    }
  }
};
MetadataTabs.__docgenInfo = {
  componentName: "MetadataTabs",
  packageName: "@jutro/lab-preview-storybook-preset",
  description: "",
  displayName: "MetadataTabs",
  methods: [],
  actualName: "MetadataTabs"
};
//# sourceMappingURL=MetadataTabs.js.map