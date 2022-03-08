import { openJutroApplication } from '../utils/RoleInitializer';
import { SettingsPage } from '../pages/SettingsPage';
import { JutroAppToolbarPage } from '../pages/JutroAppToolbarPage';

const settingsPage = new SettingsPage();
const jutroAppToolbar = new JutroAppToolbarPage();

fixture`Settings Page`.beforeEach(async () => {
    await openJutroApplication();
    await jutroAppToolbar.openSettingsPage();
});

test.skip('Applies appropriate translations when language is switched', async t => {
    await settingsPage.selectLanguage('Deutsch');
    await t
        .expect(settingsPage.languageDropdownLabel.textContent)
        .eql('Sprache:');
});
