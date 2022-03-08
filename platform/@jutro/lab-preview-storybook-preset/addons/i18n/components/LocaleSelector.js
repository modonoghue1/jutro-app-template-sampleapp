"use strict";

var _interopRequireWildcard = require("@babel/runtime-corejs3/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LocaleSelector = void 0;

var _react = _interopRequireWildcard(require("react"));

var _components = require("@storybook/components");

var _IconButtonWithLabel = require("./IconButtonWithLabel");

const LocaleSelector = (0, _react.memo)(props => {
  const locale = props.locale,
        onLocaleChange = props.onLocaleChange,
        locales = props.locales;

  const localesWithHandlers = onHide => locales.map(loc => ({ ...loc,
    active: locale === loc.id,
    onClick: () => {
      onLocaleChange(loc.id);
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
    id: "locale",
    title: "Locale selector",
    icon: "globe",
    activeItem: locale
  }));
});
exports.LocaleSelector = LocaleSelector;
//# sourceMappingURL=LocaleSelector.js.map