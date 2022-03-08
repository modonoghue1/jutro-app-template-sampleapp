/**
 * Gets the 'onCancel', 'onPrevious', 'onNext', and 'onFinish' actions provided via props and context
 * The list of actions will be used by {WizardActionBar}
 *
 * @returns {Array<any>} - the list of actions with methods associated
 */
export function getActions({ cancelPath, finishPath, steps, basePath, initialStepPath, location, callbacks, buttonProps, knockoutPath, }: {
    cancelPath: any;
    finishPath: any;
    steps: any;
    basePath: any;
    initialStepPath: any;
    location: any;
    callbacks: any;
    buttonProps: any;
    knockoutPath: any;
}): Array<any>;
