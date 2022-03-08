"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Properties = void 0;

var _react = _interopRequireDefault(require("react"));

var _theming = require("@storybook/theming");

var _api = require("@storybook/api");

var _components = require("@storybook/components");

var _constants = require("./constants");

var _defaults = require("./defaults");

var _Icon = require("./Icon");

const StatusContainer = _theming.styled.div`
    display: flex;
    align-items: center;
`;
const StatusText = _theming.styled.span`
    text-transform: uppercase;
`;
const StatusBadge = _theming.styled.div`
    display: flex;
    height: 2em;
    padding: 0.4em 1em;
    align-self: center;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    border-radius: 1em;
    background: ${({
  backgroundColor
}) => backgroundColor};
    color: ${({
  color
}) => color};
    user-select: none;

    & svg {
        margin-right: 5px;
        width: 18px;
        height: 18px;
    }
`;

const Tooltip = ({
  desc
}) => _react.default.createElement(_components.TooltipMessage, {
  desc: desc
});

const Properties = () => {
  var _storyData$parameters, _storyData$parameters2;

  const api = (0, _api.useStorybookApi)();
  const properties = (0, _api.useParameter)(_constants.PARAM_KEY, _defaults.defaultProperties);
  const storyData = api.getCurrentStoryData();
  const storyComponent = storyData === null || storyData === void 0 ? void 0 : (_storyData$parameters = storyData.parameters) === null || _storyData$parameters === void 0 ? void 0 : _storyData$parameters.component;
  const storyProperties = storyData === null || storyData === void 0 ? void 0 : (_storyData$parameters2 = storyData.parameters) === null || _storyData$parameters2 === void 0 ? void 0 : _storyData$parameters2.properties;

  if (!storyComponent || !storyProperties) {
    return null;
  }

  return _react.default.createElement(_react.default.Fragment, null, Object.entries(storyProperties).map(([propertyName, propertyValue]) => {
    const propertyStatuses = properties[propertyName];

    if (!propertyStatuses || !propertyStatuses[propertyValue]) {
      return null;
    }

    const _propertyStatuses$pro = propertyStatuses[propertyValue],
          backgroundColor = _propertyStatuses$pro.backgroundColor,
          _propertyStatuses$pro2 = _propertyStatuses$pro.color,
          color = _propertyStatuses$pro2 === void 0 ? '#ffffff' : _propertyStatuses$pro2,
          icon = _propertyStatuses$pro.icon,
          description = _propertyStatuses$pro.description;
    const trigger = description ? 'hover' : 'none';
    return _react.default.createElement(StatusContainer, {
      key: propertyName
    }, _react.default.createElement(_components.WithTooltip, {
      placement: "bottom",
      trigger: trigger,
      tooltip: _react.default.createElement(Tooltip, {
        desc: description || ''
      })
    }, _react.default.createElement(StatusBadge, {
      color: color,
      backgroundColor: backgroundColor
    }, _react.default.createElement(_Icon.Icon, {
      icon: icon
    }), _react.default.createElement(StatusText, null, propertyValue))));
  }), _react.default.createElement(_components.Separator, null));
};

exports.Properties = Properties;
Properties.__docgenInfo = {
  "description": "",
  "methods": [],
  "displayName": "Properties"
};
Tooltip.__docgenInfo = {
  componentName: "Tooltip",
  packageName: "@jutro/lab-preview-storybook-preset",
  description: "",
  displayName: "Tooltip",
  methods: [],
  actualName: "Tooltip"
};
Properties.__docgenInfo = {
  componentName: "Properties",
  packageName: "@jutro/lab-preview-storybook-preset",
  description: "",
  displayName: "Properties",
  methods: [],
  actualName: "Properties"
};
//# sourceMappingURL=Properties.js.map