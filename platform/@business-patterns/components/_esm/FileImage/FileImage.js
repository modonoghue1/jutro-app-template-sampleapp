import _extends from "@babel/runtime-corejs3/helpers/extends";
import _objectWithoutProperties from "@babel/runtime-corejs3/helpers/objectWithoutProperties";
import _slicedToArray from "@babel/runtime-corejs3/helpers/slicedToArray";
import React, { useEffect, useMemo, useState } from 'react';
import { Image } from '@jutro/components';
import omit from "lodash/fp/omit";

var useImageAsDataUrl = function useImageAsDataUrl(file) {
  var _useState = useState(),
      _useState2 = _slicedToArray(_useState, 2),
      dataUrl = _useState2[0],
      setDataUrl = _useState2[1];

  var reader = useMemo(function () {
    return new FileReader();
  }, []);
  useEffect(function () {
    if (!file || !(file instanceof Blob)) {
      setDataUrl(undefined);
      return;
    }

    reader.onload = function () {
      return setDataUrl(reader.result);
    };

    reader.readAsDataURL(file);
  }, [file, reader]);
  return dataUrl;
};

var omitMetadataProps = omit(['showRequired', 'showOptional', 'showErrors', 'onValidationChange', 'onValueChange']);
export var FileImage = function FileImage(_ref) {
  var value = _ref.value,
      _ref$hideLoader = _ref.hideLoader,
      hideLoader = _ref$hideLoader === void 0 ? false : _ref$hideLoader,
      rest = _objectWithoutProperties(_ref, ["value", "hideLoader"]);

  var imageProps = omitMetadataProps(rest);
  var dataUrl = useImageAsDataUrl(value);

  if (!value || value && !dataUrl && hideLoader) {
    return null;
  }

  return React.createElement(Image, _extends({}, imageProps, {
    src: dataUrl
  }));
};
//# sourceMappingURL=FileImage.js.map