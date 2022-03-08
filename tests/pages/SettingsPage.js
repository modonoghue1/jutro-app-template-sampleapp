import { Selector, t } from 'testcafe';

export class SettingsPage {
    constructor() {
        this.languageDropdownLabel = Selector('label[for="languageSelect"]');
        this.languageDropdown = Selector(
            'div#languageSelect-wrapper, select#languageSelect'
        );
        this.languageDropdownOption = this.languageDropdown.find(
            'div[class*=option], option'
        );
    }

    async selectLanguage(language) {
        await t
            .click(this.languageDropdown)
            .click(this.languageDropdownOption.withText(language));
    }
}
