import { WeakValidationMap } from 'react';
import PropTypes from 'prop-types';
import { IntlMessageShape } from './intlMessageShape';
export declare type SideContentShape = {
    /**
     * Id of side content trigger button
     */
    id?: string;
    /**
     * Label describing the content used for accessibility
     */
    label: IntlMessageShape;
    /**
     * Icon that will represent the content on the icon bar
     */
    icon?: string;
    /**
     * Component to render as content
     */
    component: ReactComponent;
    /**
     * Component props
     */
    componentProps?: Record<string, unknown>;
};
export declare const sideContentPropTypes: WeakValidationMap<SideContentShape>;
export declare const sideContentShape: PropTypes.Requireable<PropTypes.InferProps<WeakValidationMap<SideContentShape>>>;
