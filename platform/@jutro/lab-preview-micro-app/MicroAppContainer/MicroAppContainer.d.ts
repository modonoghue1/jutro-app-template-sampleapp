import React from 'react';
import PropTypes from 'prop-types';
export declare const microAppContainerPropTypes: {
    /**
     * The name for the remote scope associated to this micro-app in Jutro configs
     */
    remoteScope: PropTypes.Validator<string>;
    /**
     * The props to be passed to the renderer function, isolated here to avoid
     * naming conflicts with the MicroAppContainer props
     */
    props: PropTypes.Requireable<PropTypes.InferProps<{
        /**
         * Overrides to the config values of the micro-app
         * @deprecated
         */
        configOverrides: PropTypes.Validator<any>;
        /**
         * Overrides of the launchProps supplied to the start method of the micro-app
         * @deprecated
         */
        launchPropOverrides: PropTypes.Validator<any>;
        /**
         * Extensions to the component map which will be resolved in metadata of the  micro-app
         * @deprecated
         */
        componentMapExtensions: PropTypes.Validator<any>;
        /**
         * The function to load locale messages
         * @deprecated
         */
        messageLoader: PropTypes.Validator<any>;
        /**
         * The function to load core app locale messages
         * @deprecated
         */
        coreMessageLoader: PropTypes.Validator<any>;
        /**
         * The tag to render text inside of react-intl <Formatted*> components; defaults to React.Fragment (https://formatjs.io/docs/react-intl/upgrade-guide-3x)
         * @deprecated
         */
        intlTextComponent: PropTypes.Validator<any>;
        /**
         * Callback for when auth session expiresß
         * @deprecated
         */
        onAuthSessionExpired: PropTypes.Validator<any>;
        /**
         * Props to be used only in dev mode
         */
        devProps: PropTypes.Requireable<{
            [x: string]: any;
        }>;
    }>>;
};
export declare type MicroAppContainerPropTypes = PropTypes.InferProps<typeof microAppContainerPropTypes>;
export declare const MicroAppContainer: React.FC<MicroAppContainerPropTypes>;
