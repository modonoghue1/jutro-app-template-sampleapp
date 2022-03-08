import "core-js/modules/web.dom-collections.for-each.js";
import _Object$getOwnPropertySymbols from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols";
import _Object$getOwnPropertyDescriptor from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor";
import _Object$getOwnPropertyDescriptors from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors";
import _defineProperty from "@babel/runtime-corejs3/helpers/defineProperty";
import _slicedToArray from "@babel/runtime-corejs3/helpers/slicedToArray";
import _Object$keys2 from "@babel/runtime-corejs3/core-js-stable/object/keys";
import _mapInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/map";
import _sortInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/sort";
import _filterInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/filter";
import _endsWithInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/ends-with";

function ownKeys(object, enumerableOnly) { var keys = _Object$keys2(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); if (enumerableOnly) symbols = _filterInstanceProperty(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (_Object$getOwnPropertyDescriptors) { Object.defineProperties(target, _Object$getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { useContext, useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { TypeaheadMultiSelectField } from '@jutro/components';
import set from "lodash/set";
import omit from "lodash/omit";
import pickBy from "lodash/pickBy";
import isObject from "lodash/isObject";
import { TranslatorContext } from '@jutro/locale';
import { intlMessageShape } from '@jutro/prop-types';
import { Grid } from '@jutro/layout';
import { useSetComponentValue, useSetDefaultCountry, useSetComponentValidation, useSetValueForUnknownCountry } from './AddressComponents.hooks';
import { AddressForm } from './addressForm/AddressForm';
import { labelMessages } from './AddressComponent.messages';
import { countriesAddressData, defaultCountryForm } from './defaultCountryData';
export var AddressComponent = function AddressComponent(_ref) {
  var _countriesDataMerged$2;

  var value = _ref.value,
      onValueChange = _ref.onValueChange,
      onValidationChange = _ref.onValidationChange,
      countriesData = _ref.countriesData,
      defaultCountry = _ref.defaultCountry,
      readOnly = _ref.readOnly,
      readOnlyFormat = _ref.readOnlyFormat,
      readOnlyLabel = _ref.readOnlyLabel,
      _ref$showCountrySelec = _ref.showCountrySelection,
      showCountrySelection = _ref$showCountrySelec === void 0 ? 'selectable' : _ref$showCountrySelec,
      id = _ref.id,
      path = _ref.path,
      showErrors = _ref.showErrors,
      alwaysShowMaskPostalCode = _ref.alwaysShowMaskPostalCode;
  var translator = useContext(TranslatorContext);

  var _useState = useState(value),
      _useState2 = _slicedToArray(_useState, 2),
      componentValue = _useState2[0],
      setComponentValue = _useState2[1];

  var _useState3 = useState(true),
      _useState4 = _slicedToArray(_useState3, 2),
      isComponentValid = _useState4[0],
      setIsComponentValid = _useState4[1];

  var countriesDataMerged = useMemo(function () {
    var data = countriesData ? _objectSpread({}, countriesData) : _objectSpread({}, countriesAddressData);
    return pickBy(data, isObject);
  }, [countriesData]);
  var resolveCountriesForDropdown = useMemo(function () {
    var _Object$keys, _context;

    var availableCountries = (_Object$keys = _Object$keys2(countriesDataMerged)) === null || _Object$keys === void 0 ? void 0 : _mapInstanceProperty(_Object$keys).call(_Object$keys, function (country) {
      var _countriesDataMerged$;

      var countryCode = countriesDataMerged[country].countryCode;
      return {
        code: countryCode,
        name: translator((_countriesDataMerged$ = countriesDataMerged[countryCode]) === null || _countriesDataMerged$ === void 0 ? void 0 : _countriesDataMerged$.country)
      };
    });

    if (availableCountries.every(function (country) {
      return (country === null || country === void 0 ? void 0 : country.code) !== (value === null || value === void 0 ? void 0 : value.country);
    })) {
      var unknownCountryDropdownOption = {
        code: value === null || value === void 0 ? void 0 : value.country,
        name: value === null || value === void 0 ? void 0 : value.country
      };
      availableCountries.push(unknownCountryDropdownOption);
    }

    var countriesDropdownAlphabeticalOrder = _sortInstanceProperty(_context = _mapInstanceProperty(availableCountries).call(availableCountries, function (country) {
      return country.name;
    })).call(_context);

    return _mapInstanceProperty(countriesDropdownAlphabeticalOrder).call(countriesDropdownAlphabeticalOrder, function (country) {
      return _filterInstanceProperty(availableCountries).call(availableCountries, function (_ref2) {
        var name = _ref2.name;
        return name === country;
      })[0];
    });
  }, []);
  useSetComponentValidation(isComponentValid, onValidationChange);
  useSetComponentValue(componentValue, onValueChange, path);
  useSetDefaultCountry(defaultCountry, countriesDataMerged, resolveCountriesForDropdown, setComponentValue);
  useSetValueForUnknownCountry(value, countriesDataMerged, defaultCountryForm, setComponentValue);
  var validateAddressComponent = useCallback(function (isFormValid) {
    setIsComponentValid(isFormValid);
  }, []);
  var handleWrite = useCallback(function (fieldValue, fieldPath) {
    setComponentValue(function (prevState) {
      var newState = _objectSpread({}, prevState);

      _endsWithInstanceProperty(fieldPath).call(fieldPath, 'postalCode') ? set(newState, fieldPath, fieldValue.toUpperCase()) : set(newState, fieldPath, fieldValue);

      if (!fieldValue) {
        newState = omit(newState, [fieldPath]);
      }

      return newState;
    });
  }, []);
  var handleCountryDropdownWrite = useCallback(function (dropdownValue) {
    setComponentValue(function (prevState) {
      if ((prevState === null || prevState === void 0 ? void 0 : prevState.country) !== (dropdownValue === null || dropdownValue === void 0 ? void 0 : dropdownValue.code)) {
        return {
          country: dropdownValue === null || dropdownValue === void 0 ? void 0 : dropdownValue.code
        };
      }

      return prevState;
    });
  }, []);
  var countryValueWithCountryName = {
    code: componentValue === null || componentValue === void 0 ? void 0 : componentValue.country,
    name: translator((_countriesDataMerged$2 = countriesDataMerged[componentValue === null || componentValue === void 0 ? void 0 : componentValue.country]) === null || _countriesDataMerged$2 === void 0 ? void 0 : _countriesDataMerged$2.country) || (componentValue === null || componentValue === void 0 ? void 0 : componentValue.country)
  };
  var resolveCountryToRender = useMemo(function () {
    var valueCountryCode = componentValue === null || componentValue === void 0 ? void 0 : componentValue.country;
    var countryFromValue = countriesDataMerged === null || countriesDataMerged === void 0 ? void 0 : countriesDataMerged[valueCountryCode];

    if (!countryFromValue) {
      return defaultCountryForm;
    }

    return countryFromValue;
  }, [countriesDataMerged, componentValue === null || componentValue === void 0 ? void 0 : componentValue.country]);

  if (readOnly) {
    var readOnlyValue = _objectSpread({}, componentValue);

    readOnlyValue.country = countryValueWithCountryName;
    return React.createElement(AddressForm, {
      value: readOnlyValue,
      countryData: resolveCountryToRender,
      readOnly: readOnly,
      readOnlyFormat: readOnlyFormat,
      readOnlyLabel: readOnlyLabel,
      id: id
    });
  }

  if (showCountrySelection === 'hidden') {
    return React.createElement(AddressForm, {
      value: componentValue,
      onValueChange: handleWrite,
      countryData: resolveCountryToRender,
      id: id,
      onValidationChange: validateAddressComponent,
      showErrors: showErrors
    });
  }

  return React.createElement(Grid, {
    hgap: "large",
    vgap: "medium"
  }, React.createElement(TypeaheadMultiSelectField, {
    id: "".concat(id, "_countrySelect"),
    path: "country",
    label: translator(labelMessages.countryLabel),
    availableValues: resolveCountriesForDropdown,
    onValueChange: handleCountryDropdownWrite,
    value: countryValueWithCountryName,
    singleSelect: true,
    dataType: "object",
    readOnly: showCountrySelection === 'readOnly',
    onValidationChange: validateAddressComponent,
    showErrors: showErrors
  }), React.createElement(AddressForm, {
    value: componentValue,
    onValueChange: handleWrite,
    countryData: resolveCountryToRender,
    metadataFormKey: componentValue === null || componentValue === void 0 ? void 0 : componentValue.country,
    id: id,
    onValidationChange: validateAddressComponent,
    showErrors: showErrors,
    alwaysShowMaskPostalCode: alwaysShowMaskPostalCode
  }));
};
AddressComponent.propTypes = {
  value: PropTypes.object,
  onValueChange: PropTypes.func,
  onValidationChange: PropTypes.func,
  countriesData: PropTypes.object,
  defaultCountry: PropTypes.string,
  readOnly: PropTypes.bool,
  readOnlyFormat: PropTypes.oneOf(['oneLine', 'envelopeBigToSmall', 'envelopeSmallToBig']),
  readOnlyLabel: intlMessageShape,
  showCountrySelection: PropTypes.oneOf(['selectable', 'readOnly', 'hidden']),
  id: PropTypes.string.isRequired,
  path: PropTypes.string,
  showErrors: PropTypes.bool,
  alwaysShowMaskPostalCode: PropTypes.bool
};
//# sourceMappingURL=AddressComponent.js.map