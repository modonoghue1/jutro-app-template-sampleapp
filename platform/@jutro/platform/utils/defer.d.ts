/**
 * A simple implementation of a promise deferral API Object.  Returns an object containing a `promise` and two methods
 * `resolve()` and `reject()` which are the methods that can be used to "fulfill" the contained promise externally.
 *
 * @returns {{promise: Promise, resolve: function, reject: function}} - The new deferral object
 */
export default function defer(): {
    promise: Promise<any>;
    resolve: Function;
    reject: Function;
};
