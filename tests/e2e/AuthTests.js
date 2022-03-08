import { openJutroApplication } from '../utils/RoleInitializer';
import { JutroAppToolbarPage } from '../pages/JutroAppToolbarPage';
import { OktaPage } from '../pages/OktaPage';

const jutroAppToolbar = new JutroAppToolbarPage();
const oktaPage = new OktaPage();
const isAuthEnabled = process.env.E2E_AUTH_ENABLED === 'true';

fixture`Auth`.beforeEach(async () => {
    await openJutroApplication();
});

if (isAuthEnabled) {
    test('Verify that log-out returns the user to the Okta login screen', async t => {
        await jutroAppToolbar.clickLogoutButton();
        await t.wait(5000).expect(oktaPage.oktaContainer.exists).ok();
    });
}
