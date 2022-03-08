const { configure } = require('enzyme');
/*
 * Enzyme adaptor not officially provided yet, current implementation is using local code from
 * an open pull request in the official Enzyme github:
 * https://github.com/enzymejs/enzyme/pull/2430
 */
const Adapter = require('./adaptor');

configure({ adapter: new Adapter() });
