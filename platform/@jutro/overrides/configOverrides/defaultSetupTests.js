const { mount, shallow } = require('enzyme');

global.mount = mount;
global.shallow = shallow;

global.__TEST__ = true;
global.__DEV__ = false;
global.__BUILD_PARAMS__ = false;
global.__FULL_ENV__ = process.env;

global.dom = global;
global.window.alert = msg => window.console.log('Alert:', msg);
global.window.scrollTo = (x, y) =>
    window.console.log('ScrollTo X:', x, ' Y:', y);
global.document.createRange = () => ({
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setStart: () => {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setEnd: () => {},
    commonAncestorContainer: {
        nodeName: 'BODY',
        ownerDocument: document,
    },
});
// micro-app config uses the following properties
global.window.jutroRouter = {};
Object.defineProperty(document, 'currentScript', {
    value: document.createElement('script'),
});
// eslint-disable-next-line
global.__non_webpack_require__ = require;
global.ResizeObserver = class {
    // eslint-disable-next-line class-methods-use-this,@typescript-eslint/no-empty-function
    observe() {}

    // eslint-disable-next-line class-methods-use-this,@typescript-eslint/no-empty-function
    unobserve() {}

    // eslint-disable-next-line class-methods-use-this,@typescript-eslint/no-empty-function
    disconnect() {}
};

// To handle: `Error: Not implemented: window.computedStyle(elt, pseudoElt)`
// As out Icon component is using this method it throws a lot of warnings
const { getComputedStyle } = window;
window.getComputedStyle = (elt, pseudoElt) =>
    pseudoElt ? '' : getComputedStyle(elt);
