import React, { ReactNode } from 'react';
import { IntlMessageShape } from '@jutro/prop-types';
export declare type LoaderProps = Readonly<{
    /**
     * CSS class name for this component
     */
    className?: string;
    /**
     * The children elements to render inside of this component's body
     */
    children?: ReactNode;
    /**
     * Controls whether the Loader UI is shown vs the `children`;
     *      For boolean values, if `false` is passed then the Loader UI is shown otherwise the `children` are; For
     *      Promise value(s), the Loader UI will be shown until the promise has completed then the `children` are.
     */
    loaded?: boolean | Promise<unknown> | ReadonlyArray<Promise<unknown>>;
    /**
     * Optional message text to display when the Loader UI is shown
     */
    text?: IntlMessageShape;
    /**
     * Callback to render loader
     */
    renderLoader?: () => ReactNode;
}>;
/**
 * Renders an animated component that you can show when loading some other content.
 *
 * @typedef {typeof Loader.propTypes} LoaderPropTypes
 * @extends Component<PropTypes.InferProps<LoaderPropTypes>>
 *
 * @metadataType element
 */
export declare const Loader: React.FC<LoaderProps>;
