import React, { useContext } from 'react';
import { TranslatorContext } from '@jutro/locale';
import styles from "./Section.module.css";

var getStyle = function getStyle(suffix) {
  return styles["business-section".concat(suffix ? "-".concat(suffix) : '')];
};

export var Section = function Section(_ref) {
  var children = _ref.children,
      title = _ref.title,
      id = _ref.id;
  var translator = useContext(TranslatorContext);
  return React.createElement("div", {
    id: id,
    className: getStyle()
  }, React.createElement("h3", {
    className: getStyle('title')
  }, translator(title)), children);
};
Section.displayName = 'Section';
//# sourceMappingURL=Section.js.map