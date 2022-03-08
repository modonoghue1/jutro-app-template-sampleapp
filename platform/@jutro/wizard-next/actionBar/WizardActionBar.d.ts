export const WizardActionBar: React.MemoExoticComponent<typeof WizardActionBarInternal>;
/**
 * WizardActionBar is an Jutro component
 * The WizardActionBar generate and renders the <WizardButton> from actions passed via props.
 * It combines the action with default properties for each button; the default properties are overwrited
 * when provided in actions.
 *
 * @example
 * const actions = [{
 *  name: 'cancel'
 *  to: '/'
 * },{
 *  name: 'next',
 *  to: '/wizard/test/step2'
 * }]
 *
 * <WizardActionBar actions={actions} className='gw-custom-wizard-action-bar' />
 *
 * @type {React.FC<PropTypes.InferProps<typeof wizardActionBarPropTypes>>}
 */
declare function WizardActionBarInternal({ actions, className, layout }: {
    actions: any;
    className: any;
    layout: any;
}): React.ReactElement<any, string | React.JSXElementConstructor<any>>;
declare namespace WizardActionBarInternal {
    export { wizardActionBarPropTypes as propTypes };
    export const defaultProps: Partial<PropTypes.InferProps<{
        /**
         * The list of actions to be rendered in the <WizardActionBar>
         */
        actions: PropTypes.Validator<any[]>;
        /**
         * CSS class name for this component
         */
        className: PropTypes.Requireable<string>;
        /**
         * type of layout applied to action bar items: `default` - keeps items with visual separation,
         * `spaceEvenly` - distributes items evenly in available grid space,
         * `center` - center button horizontally, will vertically stack multiple buttons
         */
        layout: PropTypes.Requireable<string>;
    }>> | undefined;
    export const displayName: string | undefined;
}
import React from "react";
declare namespace wizardActionBarPropTypes {
    const actions: PropTypes.Validator<any[]>;
    const className: PropTypes.Requireable<string>;
    const layout: PropTypes.Requireable<string>;
}
import PropTypes from "prop-types";
export {};
