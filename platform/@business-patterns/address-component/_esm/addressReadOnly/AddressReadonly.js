import _mapInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/map";
import _reverseInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/reverse";
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { TranslatorContext } from '@jutro/locale';
import { intlMessageShape } from '@jutro/prop-types';
import { InputField } from '@jutro/components';
import css from "./AddressReadonly.module.css";

var mapAddressEntry = function mapAddressEntry(addressEntry) {
  return typeof addressEntry === 'string' ? addressEntry : addressEntry.name;
};

var getAddressLine = function getAddressLine(format, address) {
  if (address) {
    var addressValues = _mapInstanceProperty(address).call(address, mapAddressEntry);

    switch (format) {
      case 'envelopeSmallToBig':
        {
          return addressValues.join(', \n');
        }

      case 'envelopeBigToSmall':
        {
          return _reverseInstanceProperty(addressValues).call(addressValues).join(', \n');
        }

      case 'oneLine':
        {
          return addressValues.join(', ');
        }

      default:
        {
          throw new Error('Wrong format');
        }
    }
  }
};

export var AddressReadonly = function AddressReadonly(_ref) {
  var id = _ref.id,
      label = _ref.label,
      _ref$format = _ref.format,
      format = _ref$format === void 0 ? 'oneLine' : _ref$format,
      address = _ref.address;
  var translator = useContext(TranslatorContext);
  return React.createElement(InputField, {
    label: translator(label),
    readOnly: true,
    className: format !== 'oneLine' ? css.addressReadonly : null,
    value: getAddressLine(format, address),
    id: id
  });
};
AddressReadonly.propTypes = {
  address: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.shape({
    name: PropTypes.string
  })])).isRequired,
  format: PropTypes.oneOf(['oneLine', 'envelopeBigToSmall', 'envelopeSmallToBig']),
  label: intlMessageShape,
  id: PropTypes.string.isRequired
};
//# sourceMappingURL=AddressReadonly.js.map