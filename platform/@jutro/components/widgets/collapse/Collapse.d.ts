import React, { ReactNode } from 'react';
import { TransitionProps } from 'react-transition-group/Transition';
declare type DelayType = number | {
    show: number;
    hide: number;
};
declare type CollapseProps = Pick<TransitionProps, 'timeout' | 'onEnter' | 'onEntering' | 'onEntered' | 'onExit' | 'onExiting' | 'onExited'> & {
    /**
     * If true, component will expand, if false component will collapse
     */
    isOpen?: boolean;
    /**
     * Duration of the transition, in milliseconds
     * Used if 'timeout' prop is not passed
     * @deprecated
     */
    delay?: DelayType;
    /**
     * Width/height of the component in collapsed state
     */
    collapsedSize?: number | string;
    /**
     * If true, transition orientation will be horizontal (width will be transitioned)
     * If false, it will be vertical (height will be transitioned)
     */
    isHorizontal?: boolean;
    /**
     * If true, absolute positioning will be used and element will expand over page content
     * If false, content will be squeezed
     */
    expandOverContent?: boolean;
    /**
     * When collapse expands within document flow (that is, expandOverContent is set to false) direction of expansion is determined by container.
     * However, when we use absolute positioning it always expands right/bottom.
     * If this prop is true, collapse will expand reverse direction (for example in right side bar with expandOverContent set to true).
     * NOTE: it only takes effect when expandOverContent and isHorizontal are true.
     */
    isReversed?: boolean;
    /**
     * Callback fired after the “entered” status is applied
     * Used when 'onEntered' prop is not passed
     * @deprecated
     */
    onOpened?: () => unknown;
    /**
     * Callback fired after the “exited” status is applied
     * Used when 'onExited' prop is not passed
     * @deprecated
     */
    onClosed?: () => unknown;
    /**
     * Expanding/collapsing element
     */
    children: ReactNode;
    /**
     * CSS classname applied to root element
     */
    className?: string;
    /**
     * CSS classname applied to root transition element
     */
    outerContentWrapperClassName?: string;
    /**
     * CSS classname applied to element that wraps children
     */
    contentWrapperClassName?: string;
};
export declare const Collapse: React.FC<CollapseProps>;
export {};
