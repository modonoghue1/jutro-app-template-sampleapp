#!/usr/bin/env node

/* eslint-disable no-console */

require('dotenv').config();
const minimist = require('minimist');

const {
    initializeLighthouse,
    runLighthouseAudits,
    updateClientConfig,
} = require('./lighthouse');
const { pipePromises } = require('./lighthouse/utils');

const { init, test, update, ...runArgs } = minimist(process.argv.slice(2));

const commandsMap = [
    {
        shouldExecute: init,
        command: initializeLighthouse,
        startingLog: 'Starting initializing Lighthouse..',
    },
    {
        shouldExecute: test,
        command: () => runLighthouseAudits(runArgs),
        startingLog: 'Starting running Lighthouse audits..',
    },
    {
        shouldExecute: update,
        command: () => updateClientConfig(runArgs),
        startingLog: 'Starting updating Lighthouse thresholds..',
    },
];

const executableCommands = commandsMap.filter(({ shouldExecute }) =>
    Boolean(shouldExecute)
);

pipePromises(
    ...executableCommands.map(({ command, startingLog }) =>
        pipePromises(() => console.log(startingLog), command)
    )
)()
    .then(() => console.log('Lighthouse tasks done!'))
    .catch(console.log);
