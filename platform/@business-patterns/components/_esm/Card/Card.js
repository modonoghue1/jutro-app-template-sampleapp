import _extends from "@babel/runtime-corejs3/helpers/extends";
import React, { useContext } from 'react';
import { TranslatorContext } from '@jutro/locale';
import { Button } from '@jutro/components';
import styles from "./Card.module.css";

var getStyle = function getStyle(suffix) {
  return styles["business-card".concat(suffix ? "-".concat(suffix) : '')];
};

export var Card = function Card(_ref) {
  var maxWidth = _ref.maxWidth,
      children = _ref.children,
      title = _ref.title,
      id = _ref.id,
      headerAction = _ref.headerAction;
  var translator = useContext(TranslatorContext);
  return React.createElement("div", {
    id: id,
    className: getStyle(),
    style: {
      maxWidth: maxWidth
    }
  }, title && React.createElement(React.Fragment, null, React.createElement("h2", {
    className: getStyle('title')
  }, translator(title)), headerAction && React.createElement(Button, _extends({}, headerAction, {
    className: getStyle('action')
  }), translator(headerAction.label)), React.createElement("hr", {
    className: getStyle('line')
  })), children);
};
Card.displayName = 'Card';
Card.defaultProps = {
  maxWidth: 580
};
//# sourceMappingURL=Card.js.map