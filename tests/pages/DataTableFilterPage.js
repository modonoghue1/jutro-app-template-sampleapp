import { Selector, t } from 'testcafe';

const selectDropDownOption = async function selectDropDownOption(
    dropDownSelector,
    value
) {
    await t.click(dropDownSelector);
    const menuOptions = await Selector('div[class*=menu]');
    const options = await menuOptions.find('div[class*="option"]');
    await t.click(options.withText(value));
};

export default class DataTableFilterPage {
    constructor() {
        this.searchField = Selector('input#searchFilterBar');
        this.filtersButton = Selector('button#manageFilters');
        this.nameFilter = Selector('input#nameFilter');
        this.populationDropdown = Selector('div[id*="popFilter"]');
        this.populationDropdownOption = this.populationDropdown.find(
            'div[class*="option"]'
        );
        this.weatherDropdown = Selector('div[id*="weatherFilter"]');
        this.weatherDropdownOption = this.weatherDropdown.find(
            'div[class*="option"]'
        );
        this.applyButton = Selector('button#applyFilter');
        this.clearButton = Selector('button#clearFilter');

        this.filterBarContent = Selector('div[class*="filterBar"]', {
            visibilityCheck: true,
            timeout: 400,
        });
        this.filterBadge = Selector('span[class*="manageFiltersBadge"]>span');

        this.datatableRows = Selector('div[class*="tableRowGroup"]');
    }

    async clickFiltersButton() {
        await t.click(this.filtersButton);
    }

    async inputName(name) {
        await t.typeText(this.nameFilter, name);
    }

    async inputSearch(searchPhrase) {
        await t.typeText(this.searchField, searchPhrase);
    }

    async selectPopulation(population) {
        await selectDropDownOption(this.populationDropdown, population);
    }

    async selectWeather(weather) {
        await selectDropDownOption(this.weatherDropdown, weather);
    }

    async clickApplyButton() {
        await t.click(this.applyButton);
    }

    async clickClearButton() {
        await t.click(this.clearButton);
    }
}
