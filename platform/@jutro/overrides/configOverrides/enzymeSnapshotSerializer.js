const _ = require('lodash');
const { createSerializer } = require('enzyme-to-json');

module.exports = createSerializer({
    map: info => {
        if (!info.props || !info.props.className) {
            return info;
        }

        const cssClasses = info.props.className.split(' ');
        const nonHashedClasses = cssClasses.map(className => {
            const parsed = className.match(/jut__(.*)__\S*/);
            if (parsed) {
                return parsed[0].split('__').pop();
            }
            return className;
        });
        const resultClasses = nonHashedClasses.join(' ');
        return _.setWith(
            _.clone(info),
            'props.className',
            resultClasses,
            _.clone
        );
    },
});
