import "core-js/modules/web.dom-collections.for-each.js";
import _filterInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/filter";
import _includesInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/includes";
import _Object$keys from "@babel/runtime-corejs3/core-js-stable/object/keys";
import _mapInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/map";
import _concatInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/concat";
import { useEffect } from 'react';
import omit from "lodash/omit";
import isEqual from "lodash/isEqual";
import { getDefaultCountryCode } from '@jutro/locale';
export var useSetDefaultCountry = function useSetDefaultCountry(defaultCountry, countriesDataMerged, countriesForDropdown, setComponentValue) {
  useEffect(function () {
    var defaultCountryCode = defaultCountry || getDefaultCountryCode() || 'US';

    var countryToSetAsDefault = _filterInstanceProperty(countriesForDropdown).call(countriesForDropdown, function (country) {
      return country.code === defaultCountryCode;
    });

    var countryToRenderAsDefault = countryToSetAsDefault.length ? countryToSetAsDefault[0].code : countriesForDropdown[0].code;
    setComponentValue(function (prevValue) {
      if (!(prevValue !== null && prevValue !== void 0 && prevValue.country)) {
        return {
          country: countryToRenderAsDefault
        };
      }

      return prevValue;
    });
  }, [defaultCountry, countriesDataMerged, setComponentValue, countriesForDropdown]);
};
export var useSetComponentValue = function useSetComponentValue(componentValue, onValueChange, path) {
  useEffect(function () {
    onValueChange && onValueChange(componentValue, path);
  }, [componentValue, onValueChange, path]);
};
export var useSetComponentValidation = function useSetComponentValidation(isComponentValid, onValidationChange) {
  useEffect(function () {
    onValidationChange && onValidationChange(isComponentValid);
  }, [isComponentValid, onValidationChange]);
};
export var useSetValueForUnknownCountry = function useSetValueForUnknownCountry(value, countriesDataMerged, defaultCountryForm, setComponentValue) {
  useEffect(function () {
    var _context;

    if (value && !_includesInstanceProperty(_context = _Object$keys(countriesDataMerged)).call(_context, value.country)) {
      var _context2, _context3;

      var defultFormFields = _mapInstanceProperty(_context2 = defaultCountryForm.fields).call(_context2, function (field) {
        return field === null || field === void 0 ? void 0 : field.name;
      });

      var valueFromUknownFields = [];
      var fieldsToOmitFromTheValue = [];

      _filterInstanceProperty(_context3 = _Object$keys(value)).call(_context3, function (fieldName) {
        return fieldName !== 'country';
      }).forEach(function (field) {
        if (!_includesInstanceProperty(defultFormFields).call(defultFormFields, field)) {
          valueFromUknownFields.push(value[field].name || value[field]);
          fieldsToOmitFromTheValue.push(field);
        }
      });

      if (valueFromUknownFields.length) {
        var firstEmptyAddressLine = value.addressLine3 ? 'addressLine3' : 'addressLine2';
        setComponentValue(function (prevValue) {
          var newValue = omit(prevValue, fieldsToOmitFromTheValue);

          if (prevValue[firstEmptyAddressLine]) {
            var _context4;

            newValue[firstEmptyAddressLine] = _concatInstanceProperty(_context4 = "".concat(prevValue[firstEmptyAddressLine], ", ")).call(_context4, valueFromUknownFields.join(', '));
          } else {
            newValue[firstEmptyAddressLine] = valueFromUknownFields.join(', ');
          }

          return isEqual(prevValue, newValue) ? prevValue : newValue;
        });
      }
    }
  }, []);
};
//# sourceMappingURL=AddressComponents.hooks.js.map