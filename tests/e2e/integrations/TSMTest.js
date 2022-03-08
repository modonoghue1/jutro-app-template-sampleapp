import { RequestLogger, RequestMock } from 'testcafe';
import { openJutroApplication } from '../../utils/RoleInitializer';

import { JutroAppToolbarPage } from '../../pages/JutroAppToolbarPage';

const jutroAppToolbar = new JutroAppToolbarPage();

const isTSMEnabled = process.env.REACT_APP_JUTRO_TSM_ENABLED === 'true';
const tsmServer = process.env.REACT_APP_JUTRO_TSM_SERVER;
const sumoServer = process.env.REACT_APP_JUTRO_SUMO_LOGIC_URL;

if (isTSMEnabled && process.env.E2E_AUTH_ENABLED !== 'true') {
    throw new Error(
        '[TSM tests] Auth integration has to be enabled to use TSM integration.'
    );
}

if (isTSMEnabled && !tsmServer) {
    throw new Error(
        '[TSM tests] You have to provide REACT_APP_JUTRO_TSM_SERVER variable.'
    );
}

const tsmServiceUrlRegex = new RegExp(tsmServer);

const tsmTranslations = {
    'jutro-app.Pages.CodelessForm.title': 'Codeless Form from TSM',
};

const tsmRequestLogger = RequestLogger(tsmServiceUrlRegex, {
    logResponseHeaders: true,
    logRequestHeaders: true,
});

const sumoRequestLogger = RequestLogger(new RegExp(sumoServer), {
    logResponseHeaders: true,
    logRequestHeaders: true,
});

const tsmTestFixture = fixture`TSM integration`.meta({ name: 'TSM' });

(isTSMEnabled ? tsmTestFixture : tsmTestFixture.skip).beforeEach(async () => {
    await openJutroApplication(() => {
        tsmRequestLogger.clear();
    });
});

test.requestHooks(tsmRequestLogger, sumoRequestLogger)(
    'TSM translations are applied, sumo logs are sent and request has zipkin headers',
    async t => {
        await jutroAppToolbar.openCodelessFormPage();
        await t
            .expect(tsmRequestLogger.requests.length)
            .eql(2)
            .expect(
                tsmRequestLogger.requests.find(
                    r => r.response.statusCode === 200
                )
            )
            .ok()
            .expect(
                tsmRequestLogger.requests.find(
                    r => r.request.headers['x-b3-traceid']
                )
            )
            .ok()
            .expect(
                sumoRequestLogger.requests.find(
                    r => r.response.statusCode === 200
                )
            )
            .ok()
            .expect(jutroAppToolbar.codelessFormNav.textContent)
            .eql(tsmTranslations['jutro-app.Pages.CodelessForm.title']);
    }
);

test.requestHooks(
    tsmRequestLogger,
    RequestMock().onRequestTo(tsmServiceUrlRegex).respond({}, 403, {
        'Access-Control-Allow-Origin': '*',
    })
)('application loads even though TSM failed to respond', async t => {
    await jutroAppToolbar.openCodelessFormPage();
    await t
        .expect(tsmRequestLogger.requests.length)
        .eql(2)
        .expect(
            tsmRequestLogger.requests.find(r => r.response.statusCode === 403)
        )
        .ok()
        .expect(jutroAppToolbar.codelessFormNav.textContent)
        .eql('Codeless Form');
});

test.requestHooks(tsmRequestLogger, sumoRequestLogger)(
    'list of availabl languages is loaded from TSM',
    async t => {
        await jutroAppToolbar.openSettingsPage();
        await t
            .expect(jutroAppToolbar.languageDropdownOption.count)
            .eql(3)
            .expect(jutroAppToolbar.languageDropdownOption.nth(0).value)
            .eql('en')
            .expect(jutroAppToolbar.languageDropdownOption.nth(1).value)
            .eql('pl')
            .expect(jutroAppToolbar.languageDropdownOption.nth(2).value)
            .eql('es');
    }
);
