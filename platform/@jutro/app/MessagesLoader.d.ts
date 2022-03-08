export const MessagesLoader: React.NamedExoticComponent<PropTypes.InferProps<{
    /**
     * Language code to be loaded
     */
    language: PropTypes.Validator<string>;
    /**
     * Array of functions to load messages
     * each function of the shape: (language:string) => Promise<object>
     */
    loaders: PropTypes.Requireable<(((...args: any[]) => any) | null | undefined)[]>;
    /**
     * Callback fired when loading messages is finished
     * (messages: object) => void
     */
    onLoad: PropTypes.Validator<(...args: any[]) => any>;
}>>;
import PropTypes from "prop-types";
import React from "react";
