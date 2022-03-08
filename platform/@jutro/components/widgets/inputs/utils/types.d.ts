import React from 'react';
import { RenderResult } from '@testing-library/react';
import { FieldComponent } from '../FieldComponent/FieldComponent';
export declare type BaseProps = React.ComponentProps<typeof FieldComponent>;
export declare type ArrayTwoOrMore<T> = {
    0: T;
    1: T;
} & Array<T>;
export declare type Meta<Props extends BaseProps> = {
    name: string;
    component: React.ComponentType<Props>;
    /**
     * All required props for Component, which are not part of FieldComponent props set have to be passed here.
     * Props from FieldComponent might also be passed (but all required ones are provided by test suite itself).
     */
    defaultProps?: Omit<Props, keyof BaseProps> & Partial<BaseProps>;
    testsToSkip?: string[];
    /**
     * Array with at least two correct values for given field
     */
    fieldValues: ArrayTwoOrMore<Props['value']>;
    /**
     * Optional array with incorrect values for given field.
     */
    incorrectFieldValues?: Props['value'][];
    /**
     * Function that returns "control" element for the field.
     * If control is not found, null should be returned.
     */
    getControl?: () => HTMLElement | null;
    /**
     * Function that changes field's value
     * @param control "control" element returned from getControl function
     * @param value new value for the field
     */
    changeValue?: (control: HTMLElement, value: Props['value']) => void;
};
/**
 * Properties that are not required in both Meta and DescribeMeta.
 * All properties from Meta are considered required in DescribeMeta by default.
 */
declare type MetaNotRequired = 'defaultProps';
export declare type DescribeMeta<Props extends BaseProps> = Omit<Required<Meta<Props>>, MetaNotRequired> & Pick<Meta<Props>, MetaNotRequired> & {
    renderField: (props: Partial<BaseProps>) => RenderResult;
    rerenderField: (props: Partial<BaseProps>, rerender: RenderResult['rerender']) => void;
    itWithSkip: (testName: string, testFn: () => void) => void;
};
export {};
