import React from 'react';
import { IntlMessageShape } from '@jutro/prop-types';
declare type TabProps = {
    /**
     * The id for this Tab
     */
    id: string;
    /**
     * If true, this `Tab` is disabled.
     */
    disabled?: boolean;
    /**
     * If true, this `Tab` is visible.
     */
    visible?: boolean;
    /**
     * Optional class name to apply to this component
     */
    className?: string;
    /**
     * The heading for the `Tab`. This prop is NOT rendered by the `Tab` component directly, but rather is extracted out by the `TabSet` component and rendered by it instead
     * Can either be a simple string or renderer function (which should accept rendering props object as an argument)
     */
    heading?: React.ReactNode | IntlMessageShape;
    /**
     * The content of this tab, child components to display
     */
    children?: React.ReactNode;
};
/**
 * The `Tab` component is designed to be used as the child of a `TabSet` component.  It will render its `children`
 * inside the appropriate tab pane <div> only if its `id` matches the `activeTabId` from the context provided by the
 * `TabSet` AND the component is not `disabled`.  Also, the `heading` prop will never be rendered internally by a `Tab`
 * as this will be done by the `TabSet` container instead.
 *
 * @typedef {typeof Tab.propTypes} TabPropTypes
 * @extends Component<PropTypes.InferProps<TabPropTypes>>
 *
 * @metadataType container
 */
export declare const Tab: React.FC<TabProps>;
export {};
