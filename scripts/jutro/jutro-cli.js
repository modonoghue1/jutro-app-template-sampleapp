const { get, flatten } = require('lodash');
const { cli } = require('../../platform/@jutro/cli/bin/cli');
const { defaultArgs } = require('./cli.extension.js');

const indexOfCliScript = process.argv.findIndex(arg =>
    arg.endsWith('jutro-cli.js')
);
const whiteSpaceRegex = new RegExp(/\s/);
process.argv = flatten(
    process.argv.map((arg, index) =>
        index > indexOfCliScript ? arg.split(whiteSpaceRegex) : [arg]
    )
);
const args = process.argv.slice(2);
const [commandPipeline, command] = args;

const commandArgs = Object.entries(
    get(defaultArgs, `${commandPipeline}.${command}`, {})
)
    .filter(([key]) => !process.argv.some(arg => arg.startsWith(key))) // allow overrides of default args
    .map(([key, val]) => {
        if (val === true) {
            return key;
        }
        return `${key}=${val}`;
    });

process.argv.push(...commandArgs);

cli(process.argv);
