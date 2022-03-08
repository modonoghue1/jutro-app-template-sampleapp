/**
 * Uses action properties to invoke an action and return action object for further processing by
 * `<AsyncLink>` or `handleAction()` method.
 *
 * @param {string} name
 * @param {object} props
 * @param {object} props.args
 * @param {object} props.progress
 * @param {object} props.success
 * @param {object} props.failure
 * @param {object} context
 * @param {(name: object, result: object) => void} onSuccess
 * @param {(name: object, reason: object) => void} onFailure
 * @returns {object} returns action object with action function results, processing, success and failure metadata
 *
 * @example
 * const actionObject = invokeAction('onEnter', actionProps, this.getActionContext());
 * handleAction(actionObject, this, translator);
 */
export function invokeAction(name: string, props: {
    args: object;
    progress: object;
    success: object;
    failure: object;
}, context: object, onSuccess: (name: object, result: object) => void, onFailure: (name: object, reason: object) => void): object;
/**
 * shorthand method to create an object used by handleAction
 * @param {Promise|boolean} result - The promise or boolean that should be used by handleAction
 * @param {string} successPath - The success path if *result* succedded
 * @param {string} failurePath - the failure or knockout path if *result* fail or return false
 * @param {string} progressMsg - The message that should be displayed while processing the promise
 * @returns {object}
 */
export function actionResultWithPaths(result: Promise<any> | boolean, successPath: string, failurePath: string, progressMsg: string): object;
/**
 * Default processing for action object. This method will use the action results immediately
 * or wait for the action results promise to finish before processing. Depending on the results,
 * the action will navigate to another path, display a message or show nothing at all.
 * While waiting for a promise, the 'state' of the 'instance' will be updated with
 * 'loading' and 'message'. Use 'onSuccess' and 'onFailure' calls on action object to
 * be notified of the results. See `invokeAction()` for additional information.
 *
 * @param {object} actionObject - action object to handle
 * @param {React.ReactElement} instance - react component instance; should have 'setState' and 'props.history'
 * @param {Function} translator - function translating intl messages. Default translator is used if undefined
 * @param {object} modalContext - the context containing the modal functions that trigger modals
 *
 * @example
 * const actionObject = invokeAction('onEnter', actionProps, this.getActionContext());
 * handleAction(actionObject, this, translator);
 */
export function handleAction(actionObject: object, instance: React.ReactElement, translator: Function, modalContext?: object): Promise<void>;
/**
 * Verify the integrity of action definitions. For the list of events, warn if a function
 * cannot be resolved from name or if a function argument cannnot be found in the context
 *
 * @param {Array<any>} events
 * @param {object} props
 * @param {object} context
 *
 * @example
 * checkActionIntegrity(
 *   WizardPage.actionEvents,
 *   this.props.uiProps,
 *   this.getActionContext()
 * );
 */
export function checkActionIntegrity(events: Array<any>, props: object, context: object): void;
import React from "react";
