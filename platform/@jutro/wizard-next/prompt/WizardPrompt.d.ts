export function handlePromptMessage(location: any, cancelPrompt: any, previousPrompt: any, basePath: string): string | boolean;
export const WizardPrompt: React.MemoExoticComponent<typeof WizardPromptInternal>;
/**
 * WizardPrompt is a Jutro component.
 * It wraps <Prompt> for convenient prompting when in the context of a wizard.
 * It allows separate condition and prompt for 'previous' page and 'cancel' page.
 *
 * Properties: {@link WizardPromptInternal.propTypes}
 *
 * @example
 * <WizardPrompt
 *   cancelPrompt={{when: wizardChanged, message: 'Want to cancel?'}}
 *   previousPrompt={{when: dataChanged, message: 'Want to go back?'}}
 * />
 *
 */
declare function WizardPromptInternal({ cancelPrompt, previousPrompt, basePath }: {
    cancelPrompt: any;
    previousPrompt: any;
    basePath: any;
}): JSX.Element;
declare namespace WizardPromptInternal {
    namespace propTypes {
        const cancelPrompt: PropTypes.Requireable<PropTypes.InferProps<{
            when: PropTypes.Requireable<boolean>;
            title: PropTypes.Requireable<string>;
            message: PropTypes.Requireable<string>;
            trigger: PropTypes.Requireable<(...args: any[]) => any>;
        }>>;
        const previousPrompt: PropTypes.Requireable<PropTypes.InferProps<{
            when: PropTypes.Requireable<boolean>;
            title: PropTypes.Requireable<string>;
            message: PropTypes.Requireable<string>;
            trigger: PropTypes.Requireable<(...args: any[]) => any>;
        }>>;
        const basePath: PropTypes.Requireable<string>;
    }
    const displayName: string;
}
import React from "react";
import PropTypes from "prop-types";
export {};
