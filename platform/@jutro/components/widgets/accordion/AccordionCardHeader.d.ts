import React from 'react';
import { IntlMessageShape } from '@jutro/prop-types';
declare type AccordionCardProps = {
    isOpen?: boolean;
    chevron?: boolean;
    chevronAlignment?: 'left' | 'right';
    errorState?: boolean;
    title: IntlMessageShape;
    isCollapsible?: boolean;
};
export declare const AccordionCardHeader: ({ isOpen, chevron, chevronAlignment, errorState, title, isCollapsible, }: AccordionCardProps) => React.ReactElement;
export {};
