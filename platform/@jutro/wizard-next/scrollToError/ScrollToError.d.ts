/**
 * ScrollToError is an Jutro component.
 *
 * This is a helper component that can be added to
 * a page where form fields are displayed and validated.
 * This doesn't render anything, but uses the side effects
 * of React lifecycle to inspect the DOM and scroll to the
 * first field in error.
 *
 * @example
 * this.setState({errorTimestamp: Date.now()});
 * <ScrollToError counter={this.state.errorTimestamp} />
 *
 * @extends PureComponent<{}>
 */
export class ScrollToError extends React.PureComponent<{}, any, any> {
    static propTypes: {
        /**
         * counter that should be incremented to trigger a scroll to error
         */
        counter: PropTypes.Requireable<number>;
        /**
         * timeout used when the page is using some transition and we need to wait
         * it finish to verify errors, eg. coverages inside an accordion
         */
        timeout: PropTypes.Requireable<number>;
    };
    static defaultProps: {
        counter: number;
        timeout: number;
    };
    constructor(props: {} | Readonly<{}>);
    constructor(props: {}, context: any);
    /**
     * Searches for error fields in the container node and then scrolls to the first one
     *
     * @param {Node} containerNode - container node to search for error fields
     */
    scrollToError(containerNode: Node, initialQuery?: string): void;
}
import React from "react";
import PropTypes from "prop-types";
