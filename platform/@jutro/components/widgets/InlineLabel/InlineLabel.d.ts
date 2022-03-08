import React from 'react';
declare type InlineLabelProps = {
    /**
     * Icon that's supposed to be attached
     */
    icon?: React.ReactNode;
    /**
     * Flag indicating which side should the optional icon take
     */
    iconPosition?: string;
    /**
     * Tag used to wrap the label
     */
    tag?: string | React.ElementType;
    /**
     * Content to render
     */
    children: React.ReactNode | React.ReactNode[];
};
export declare const InlineLabel: React.MemoExoticComponent<React.ForwardRefExoticComponent<InlineLabelProps & {
    dangerouslySetInnerHTML?: string | undefined;
}>>;
export {};
