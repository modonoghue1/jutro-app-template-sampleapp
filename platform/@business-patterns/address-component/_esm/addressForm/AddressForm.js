import "core-js/modules/web.dom-collections.for-each.js";
import _Object$keys from "@babel/runtime-corejs3/core-js-stable/object/keys";
import _Object$getOwnPropertySymbols from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols";
import _Object$getOwnPropertyDescriptor from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor";
import _Object$getOwnPropertyDescriptors from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors";
import _defineProperty from "@babel/runtime-corejs3/helpers/defineProperty";
import _mapInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/map";
import _valuesInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/values";
import _includesInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/includes";
import _concatInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/concat";
import _filterInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/filter";

function ownKeys(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); if (enumerableOnly) symbols = _filterInstanceProperty(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (_Object$getOwnPropertyDescriptors) { Object.defineProperties(target, _Object$getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { useMemo, useContext } from 'react';
import PropTypes from 'prop-types';
import isEmpty from "lodash/isEmpty";
import { MetadataForm } from '@jutro/uiconfig';
import { TranslatorContext } from '@jutro/locale';
import { intlMessageShape } from '@jutro/prop-types';
import { GridLayout, GridItem } from '@jutro/layout';
import { AddressReadonly } from '../addressReadOnly/AddressReadonly';
import { labelMessages } from '../AddressComponent.messages';
var defaultLayoutTypes = {
  type1: {
    columns: ['84px', 'auto'],
    colspan: 2,
    affectedFieldsName: ['postalCode', 'city']
  },
  type2: {
    columns: ['auto', '84px'],
    colspan: 2,
    affectedFieldsName: ['city', 'postalCode']
  },
  type3: {
    columns: ['auto', '128px', '84px'],
    colspan: 3,
    affectedFieldsName: ['city', 'state', 'province', 'department', 'oblast', 'postalCode']
  },
  type4: {
    columns: ['84px', 'auto'],
    colspan: 2,
    affectedFieldsName: ['postalCode']
  },
  type5: {
    columns: ['84px', 'auto'],
    colspan: 2,
    affectedFieldsName: ['postalCode']
  },
  type6: {
    columns: ['auto', '84px', '128px'],
    colspan: 3,
    affectedFieldsName: ['city', 'state', 'postalCode']
  }
};
export var AddressForm = function AddressForm(_ref) {
  var value = _ref.value,
      onValueChange = _ref.onValueChange,
      countryData = _ref.countryData,
      uiProps = _ref.uiProps,
      showErrors = _ref.showErrors,
      readOnly = _ref.readOnly,
      readOnlyFormat = _ref.readOnlyFormat,
      readOnlyLabel = _ref.readOnlyLabel,
      metadataFormKey = _ref.metadataFormKey,
      id = _ref.id,
      customLayoutTypes = _ref.customLayoutTypes,
      onValidationChange = _ref.onValidationChange,
      _ref$alwaysShowMaskPo = _ref.alwaysShowMaskPostalCode,
      alwaysShowMaskPostalCode = _ref$alwaysShowMaskPo === void 0 ? true : _ref$alwaysShowMaskPo;
  var translator = useContext(TranslatorContext);
  var layoutTypes = customLayoutTypes ? _objectSpread(_objectSpread({}, defaultLayoutTypes), customLayoutTypes) : defaultLayoutTypes;
  var layoutType = countryData !== null && countryData !== void 0 && countryData.fieldsLayoutType ? layoutTypes[countryData.fieldsLayoutType] : undefined;
  var columnsLayout = {
    columns: layoutType ? layoutType.columns : ['1fr'],
    colspan: layoutType ? layoutType.colspan : 1,
    affectedFieldsName: layoutType ? layoutType.affectedFieldsName : []
  };
  var componentUiProps = useMemo(function () {
    if (countryData && isEmpty(uiProps)) {
      var _context;

      var newUiProps = {};
      newUiProps.content = _mapInstanceProperty(_context = countryData.fields).call(_context, function (field) {
        var _countryData$required, _context2, _context3;

        var fieldName = field.name,
            fieldPath = field.path,
            fieldValues = _valuesInstanceProperty(field),
            fieldPattern = field.pattern,
            fieldMaxLength = field.maxLength,
            fieldLabel = field.label,
            fieldMask = field.mask,
            fieldTooltip = field.tooltip;

        var translatedFieldValues = fieldValues === null || fieldValues === void 0 ? void 0 : _mapInstanceProperty(fieldValues).call(fieldValues, function (fieldValue) {
          return {
            code: fieldValue.code,
            name: translator(fieldValue.name)
          };
        });
        var isRequired = (_countryData$required = countryData.requiredFields) === null || _countryData$required === void 0 ? void 0 : _countryData$required.some(function (requiredField) {
          return requiredField === fieldName;
        });
        var colspan = _includesInstanceProperty(_context2 = columnsLayout.affectedFieldsName).call(_context2, fieldName) ? 1 : columnsLayout.colspan;

        var component = function component() {
          if (fieldValues) {
            return 'DropdownSelect';
          }

          return 'Input';
        };

        var fieldMetadata = {
          id: "".concat(fieldName, "_wrapper"),
          type: 'element',
          component: GridItem,
          componentProps: {
            colSpan: colspan,
            phone: {
              colSpan: 1
            },
            phoneWide: {
              colSpan: colspan
            },
            tablet: {
              colSpan: colspan
            }
          },
          content: [{
            id: _concatInstanceProperty(_context3 = "".concat(id, "_")).call(_context3, fieldName),
            type: 'field',
            component: component(),
            componentProps: {
              path: fieldPath,
              label: translator(fieldLabel || labelMessages[fieldName]),
              availableValues: translatedFieldValues,
              required: isRequired,
              labelClassName: 'addressField',
              dataType: fieldValues ? 'object' : undefined,
              mask: fieldMask,
              tooltip: fieldTooltip,
              alwaysShowMask: alwaysShowMaskPostalCode,
              maskChar: '#'
            }
          }]
        };

        if (fieldPattern) {
          fieldMetadata.content[0].componentProps.validator = {
            pattern: fieldPattern,
            message: translator(labelMessages.patternValidationError)
          };
        }

        if (!fieldValues) {
          fieldMetadata.content[0].componentProps.maxLength = fieldMaxLength || 60;
        }

        return fieldMetadata;
      });
      return newUiProps;
    }

    return uiProps;
  }, [countryData, uiProps, columnsLayout.affectedFieldsName, columnsLayout.colspan, id, translator, alwaysShowMaskPostalCode]);
  var resolveSmallToBigValue = useMemo(function () {
    var fieldsOrderForCountry = (countryData === null || countryData === void 0 ? void 0 : countryData.fields) || [];
    var valueForReadOnly = fieldsOrderForCountry.reduce(function (sortedValue, field) {
      return _concatInstanceProperty(sortedValue).call(sortedValue, value === null || value === void 0 ? void 0 : value[field.name]);
    }, []);
    valueForReadOnly.push(value === null || value === void 0 ? void 0 : value.country);
    return _filterInstanceProperty(valueForReadOnly).call(valueForReadOnly, Boolean);
  }, [countryData, value]);

  if (readOnly) {
    return React.createElement(AddressReadonly, {
      address: resolveSmallToBigValue,
      format: readOnlyFormat,
      label: readOnlyLabel,
      id: id
    });
  }

  return React.createElement(GridLayout, {
    id: "addressLayout",
    columns: columnsLayout.columns,
    hgap: "large",
    vgap: "medium",
    phone: {
      columns: [1]
    },
    phoneWide: {
      columns: columnsLayout.columns
    },
    tablet: {
      columns: columnsLayout.columns
    }
  }, React.createElement(MetadataForm, {
    uiProps: componentUiProps,
    data: value,
    onDataChange: onValueChange,
    showRequired: true,
    showErrors: showErrors,
    key: metadataFormKey,
    onValidationChange: onValidationChange,
    id: "addressMetadataForm"
  }));
};
export var layoutTypesShape = PropTypes.shape({
  columns: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  colspan: PropTypes.number.isRequired,
  affectedFieldsName: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
});
AddressForm.propTypes = {
  value: PropTypes.object,
  onValueChange: PropTypes.func,
  onValidationChange: PropTypes.func,
  countryData: PropTypes.object,
  uiProps: PropTypes.object,
  showErrors: PropTypes.bool,
  readOnly: PropTypes.bool,
  readOnlyFormat: PropTypes.oneOf(['oneLine', 'envelopeBigToSmall', 'envelopeSmallToBig']),
  readOnlyLabel: intlMessageShape,
  metadataFormKey: PropTypes.string,
  id: PropTypes.string.isRequired,
  customLayoutTypes: PropTypes.objectOf(layoutTypesShape.isRequired),
  alwaysShowMaskPostalCode: PropTypes.bool
};
//# sourceMappingURL=AddressForm.js.map