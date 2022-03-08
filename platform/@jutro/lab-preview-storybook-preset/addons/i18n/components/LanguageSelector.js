"use strict";

var _interopRequireWildcard = require("@babel/runtime-corejs3/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LanguageSelector = void 0;

var _react = _interopRequireWildcard(require("react"));

var _components = require("@storybook/components");

var _IconButtonWithLabel = require("./IconButtonWithLabel");

const LanguageSelector = (0, _react.memo)(props => {
  const language = props.language,
        onLanguageChange = props.onLanguageChange,
        languages = props.languages;

  const localesWithHandlers = onHide => languages.map(ln => ({ ...ln,
    active: language === ln.id,
    onClick: () => {
      onLanguageChange(ln.id);
      onHide();
    }
  }));

  const tooltipList = ({
    onHide
  }) => _react.default.createElement(_components.TooltipLinkList, {
    links: localesWithHandlers(onHide)
  });

  return _react.default.createElement(_components.WithTooltip, {
    placement: "top",
    trigger: "click",
    closeOnClick: true,
    tooltip: tooltipList
  }, _react.default.createElement(_IconButtonWithLabel.IconButtonWithLabel, {
    id: "language",
    title: "Language selector",
    icon: "book",
    activeItem: language
  }));
});
exports.LanguageSelector = LanguageSelector;
//# sourceMappingURL=LanguageSelector.js.map