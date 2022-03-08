import { Selector, t } from 'testcafe';

export const pageTypes = {
    authPage: 'Auth Page',
    codelessFormPage: 'Codeless Form',
    dataTableFilterPage: 'Data Table Filter',
    jsonFormPage: 'Json Form',
    settingPage: 'Settings',
};

export class JutroAppToolbarPage {
    constructor() {
        this.formsNav = Selector('div#forms');
        this.datatableNav = Selector('div#datatable');
        this.dataTableFilterNav = Selector('a[href*="/datatable/filter"]');
        this.authNav = Selector('a[href*="/auth"]');
        this.codelessFormNav = Selector('a[href*="/forms/codeless"]');
        this.jsonFormNav = Selector('a[href*="/forms/json"]');
        this.settingPageNav = Selector('a[href*="/settings"]');
        this.pageTitleSelector = Selector('title');
        this.uiThemeDropdown = Selector('div.uiTheme select');
        this.dropdownAvatar = Selector('div#dropdownavatar');
        this.logoutButton = Selector('a[data-gw-test-auth-logout="true"]');

        this.authNavHeaderDivSelector = this.authNav.find('span');
        this.codelessFormNavHeaderDivSelector = this.codelessFormNav.find(
            'span'
        );
        this.jsonFormNavHeaderDivSelector = this.jsonFormNav.find('span');
        this.settingPageNavDivSelector = this.settingPageNav.find('span');
        this.languageDropdown = Selector(
            'div#languageSelect-wrapper, select#languageSelect'
        );
        this.languageDropdownOption = this.languageDropdown.find('option');
    }

    async openPage(navName) {
        switch (navName) {
            case pageTypes.dataTableFilterPage:
                this.openDataTableFilterPage();
                break;
            case pageTypes.authPage:
                this.openAuthPage();
                break;
            case pageTypes.codelessFormPage:
                this.openCodelessFormPage();
                break;
            case pageTypes.jsonFormPage:
                this.openJsonFormPage();
                break;
            case pageTypes.settingPage:
                this.openSettingsPage();
                break;
            default:
                throw new Exception();
        }
    }

    async openAuthPage() {
        await t.click(this.authNav);
    }

    async openDataTableFilterPage() {
        await t.click(this.datatableNav).click(this.dataTableFilterNav);
    }

    async openCodelessFormPage() {
        await t.click(this.formsNav).click(this.codelessFormNav);
    }

    async openJsonFormPage() {
        await t.click(this.formsNav).click(this.jsonFormNav);
    }

    async openSettingsPage() {
        await t.click(this.settingPageNav);
    }

    async clickLogoutButton() {
        await t.click(this.dropdownAvatar).click(this.logoutButton);
    }
}
