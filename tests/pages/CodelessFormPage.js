import { Selector, t } from 'testcafe';

const buttonByName = buttonName =>
    Selector('button[type=button]').find('span').withText(`${buttonName}`);

const selectDropDownOption = async function selectDropDownOption(
    dropDownSelector,
    { attribValue }
) {
    await t.click(dropDownSelector);
    const menuOptions = await Selector('div[class*=menu]');
    const options = await menuOptions.find('div[class*="option"]');
    await t.click(options.withText(attribValue));
};

const selectToggleOption = async function selectToggleOption(
    id,
    { attribName, attribValue }
) {
    await t.click(
        Selector(`div[id^=${id}]`)
            .find('button')
            .withAttribute(attribName, attribValue)
    );
};

const selectImageRadioButton = async function selectImageRadioButton(
    id,
    { attribName, attribValue }
) {
    await t.click(
        Selector(`div[id^=${id}]`)
            .find('label')
            .withAttribute(attribName, attribValue)
    );
};

export default class CodelessFormPage {
    constructor() {
        this.headerSelector = Selector('header[class*=Header]');
        this.codelessPageTitle = Selector('#pageHeader');
        this.mainPanelSelector = Selector('div[class*=Panel]');
        this.submitButton = buttonByName('Submit');
        this.clearFormButton = buttonByName('Clear form');
        this.yearBuiltInput = Selector('input#yearBuilt');
        this.initialValueInput = Selector('input#initialValue');
        this.numberOfStoriesSelect = Selector('div#numberOfStories-wrapper');
        this.constructionTypeSelect = Selector('div#constructionType-wrapper');
        this.foundationTypeSelect = Selector('div#foundationType-wrapper');
        this.plumbingTypeSelect = Selector('div#plumbingType-wrapper');
        this.primaryHeatingSelect = Selector('div#primaryHeating-wrapper');
        this.wiringTypeSelect = Selector('div#wiringType-wrapper');
        this.electricalSystemSelect = Selector('div#electricalSystem-wrapper');
        this.themeChooserSelect = Selector('select[class*=themeChooser]');
        this.successModal = Selector('div[class*="modalSuccessStatus"]');
        this.errorMessageSelector = Selector('div[class*=modalErrorStatus]');
        this.errorMessageCloseButtonSelector = Selector(
            'button[class*=closeButton]'
        );
        this.skipNav = visibility =>
            Selector('span', { visibilityCheck: visibility }).withText(
                'Skip to content'
            );
        this.mainSection = Selector('main');
        this.externalLinksButton = Selector('#externalLinksMenu > button');
        this.externalLinksMenu = Selector(
            '#externalLinksMenu > div[id*="externalLinksMenu"]'
        );
        this.externalLinksHeader1 = Selector(
            '#externalLinksMenu #externalLinksMenuHeader1 > div[class*="dropdownHeaderTitle"]'
        );
        this.externalLinksLink1 = Selector(
            '#externalLinksMenu #externalLinksMenuLink1'
        );
        this.externalLinksSeparator = Selector(
            '#externalLinksMenu #externalLinksMenuSeparator'
        );
        this.externalLinksHeader2 = Selector(
            '#externalLinksMenu #externalLinksMenuHeader2 > div[class*="dropdownHeaderTitle"]'
        );
        this.externalLinksLink2 = Selector(
            '#externalLinksMenu #externalLinksMenuLink2'
        );
        this.internalLinksButton = Selector('#internalLinksMenu > button');
        this.internalLinksMenu = Selector(
            '#internalLinksMenu > div[id*="internalLinksMenu"]'
        );
        this.internalLinksHeader1 = Selector(
            '#internalLinksMenu #internalLinksMenuHeader1 > div[class*="dropdownHeaderTitle"]'
        );
        this.internalLinksLink1 = Selector(
            '#internalLinksMenu #internalLinksMenuLink1'
        );
        this.internalLinksSeparator = Selector(
            '#internalLinksMenu #internalLinksMenuSeparator'
        );
        this.internalLinksHeader2 = Selector(
            '#internalLinksMenu #internalLinksMenuHeader2 > div[class*="dropdownHeaderTitle"]'
        );
        this.internalLinksLink2 = Selector(
            '#internalLinksMenu #internalLinksMenuLink2'
        );
    }

    async submitForm() {
        await t.setNativeDialogHandler(() => true).click(this.submitButton);
    }

    async clearForm() {
        await t.click(this.clearFormButton);
    }

    async fillForm(
        yearBuilt,
        initialValue,
        numberOfStories,
        garageId,
        garageOption,
        constructionType,
        foundationType,
        roofTypeId,
        roofTypeOption,
        plumbingType,
        primaryHeating,
        secondaryHeatingId,
        secondaryHeatingOption,
        wiringType,
        electricalSystem
    ) {
        await t.typeText(this.yearBuiltInput, yearBuilt, { replace: true });
        await t.typeText(this.initialValueInput, initialValue, {
            replace: true,
        });
        await selectDropDownOption(this.numberOfStoriesSelect, numberOfStories);
        await selectToggleOption(garageId, garageOption);
        await selectDropDownOption(
            this.constructionTypeSelect,
            constructionType
        );
        await selectDropDownOption(this.foundationTypeSelect, foundationType);
        await selectImageRadioButton(roofTypeId, roofTypeOption);
        await selectDropDownOption(this.plumbingTypeSelect, plumbingType);
        await selectDropDownOption(this.primaryHeatingSelect, primaryHeating);
        await selectToggleOption(secondaryHeatingId, secondaryHeatingOption);
        await selectDropDownOption(this.wiringTypeSelect, wiringType);
        await selectDropDownOption(
            this.electricalSystemSelect,
            electricalSystem
        );
    }
}
