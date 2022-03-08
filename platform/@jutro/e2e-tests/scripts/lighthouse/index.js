const { runLighthouseAudits } = require('./runLighthouseAudits');
const { initializeLighthouse } = require('./initializeLighthouse');
const { updateClientConfig } = require('./updateClientConfig');

module.exports = {
    initializeLighthouse,
    runLighthouseAudits,
    updateClientConfig,
};
