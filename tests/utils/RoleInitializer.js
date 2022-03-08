import { Role, t, Selector } from 'testcafe';

export const isAuthEnabled = process.env.E2E_AUTH_ENABLED === 'true';
const jutroApplicationUrl = process.env.DEPLOY_URL;
const username = process.env.E2E_AUTH_USERNAME;
const password = process.env.E2E_AUTH_PASSWORD;

const useNameInput = Selector('input[name="username"]');
const passwordInput = Selector('input[name="password"]');

const loginJutroApp = async () => {
    await t
        .expect(useNameInput.exists)
        .ok({ timeout: 10000 }) // needed for page to load, even 5000 would fail due to the initial redirect to okta
        .typeText(useNameInput, username, { replace: true })
        .pressKey('enter')
        .typeText(passwordInput, password, { replace: true })
        .pressKey('enter')
        .wait(10000);
};

// Temporarily create new auth role for each test
// This is to enable quarantine mode when connection to the test page is failing
// https://guidewirejira.atlassian.net/browse/JUT-4900
// https://github.com/DevExpress/testcafe/issues/5278
const createAuthenticationRole = () => Role(jutroApplicationUrl, loginJutroApp);

// keep the role object between test run to avoid having to log in again
let role;

export const openJutroApplication = async function openJutroApplication(
    beforePageLoad
) {
    if (!role) {
        role = isAuthEnabled ? createAuthenticationRole() : Role.anonymous();
    }
    await t.maximizeWindow().useRole(role);
    if (beforePageLoad) {
        beforePageLoad();
    }
    await t.navigateTo(jutroApplicationUrl);
};
