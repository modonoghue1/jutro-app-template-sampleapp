import React from 'react';
import PropTypes from 'prop-types';
export declare const microAppStarterPropTypes: {
    /**
     * The main React component to render in this micro-app and pass props to
     */
    Main: PropTypes.Validator<PropTypes.ReactComponentLike>;
    /**
     * The name for the current micro-app as determined by the shell app
     */
    microAppName: PropTypes.Validator<string>;
    /**
     * The props to be passed to the Main component from ApplicationRoot,
     * isolated here to avoid naming conflicts with the MicroAppStarter props
     */
    propsFromAppRoot: PropTypes.Requireable<{
        [x: string]: any;
    }>;
    /**
     * The props to be passed to the Main component from the shell app,
     * isolated here to avoid naming conflicts with the MicroAppStarter props
     */
    propsFromShell: PropTypes.Requireable<{
        [x: string]: any;
    }>;
    /**
     * The props related to Jutro internal behaviors, such as any dev overrides for the micro-app component map or
     * routing-related props from the shell
     */
    jutroProps: PropTypes.Requireable<{
        [x: string]: any;
    }>;
};
declare const microAppStarterDefaultProps: {
    propsFromAppRoot: {};
    propsFromShell: {};
    jutroProps: {};
};
export declare type MicroAppStarterDefaultPropsTypes = typeof microAppStarterDefaultProps;
export declare type MicroAppStarterPropTypes = PropTypes.InferProps<typeof microAppStarterPropTypes>;
export declare const MicroAppStarter: React.FC<MicroAppStarterPropTypes>;
export {};
