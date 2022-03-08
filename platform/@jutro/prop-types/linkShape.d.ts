import PropTypes from 'prop-types';
import React, { WeakValidationMap, Requireable } from 'react';
import { IntlMessageShape } from './intlMessageShape';
export declare const historyPropTypes: PropTypes.Requireable<object>;
export declare type LinkPropTypes = {
    label: IntlMessageShape;
    onClick?: (event: React.SyntheticEvent) => void;
    href?: IntlMessageShape;
};
export declare const linkPropTypes: WeakValidationMap<LinkPropTypes>;
export declare const linkShape: Requireable<LinkPropTypes>;
