import PropTypes from 'prop-types';
import { defineCodelessComponent } from './defineCodelessComponent';
import type { Metadata } from './types';
declare type ComponentMap = {
    [name: string]: ReturnType<typeof defineCodelessComponent>;
};
declare type PropTypesMap = Record<string, PropTypes.Validator<unknown>>;
export declare const extractCodelessComponentMap: (metadata: Metadata, propTypesMap?: PropTypesMap) => ComponentMap;
export declare const registerCodelessComponents: (metadata: Metadata, propTypesMap?: PropTypesMap) => void;
export {};
