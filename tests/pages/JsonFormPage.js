import { Selector, t } from 'testcafe';

export default class JsonFormPage {
    constructor() {
        this.policyTypeDropdown = Selector('div[id*="policyType"]');
        this.policyTypeOption = this.policyTypeDropdown.find(
            'div[class*="option"]'
        );
        this.companyInput = Selector('input#companyName');
        this.cityInput = Selector('input#city');
        this.lossDateInput = Selector('input#lossDate');
        this.searchButton = Selector('button#search');
        this.traceExampleButton = Selector('button#trace');
        this.resultsTable = Selector('table');
        this.resultsTableRows = Selector('tbody').find('tr');
        this.jsonFormPageTitle = Selector('span[id*="title"]');
    }

    async clickSearch() {
        await t.click(this.searchButton);
    }

    async clickTraceExample() {
        await t.click(this.traceExampleButton);
    }

    async selectPolicyType(policyType) {
        await t
            .click(this.policyTypeDropdown)
            .click(this.policyTypeOption.withText(policyType));
    }

    async inputCity(cityName) {
        await t.typeText(this.cityInput, cityName);
    }

    async inputCompany(companyName) {
        await t.typeText(this.companyInput, companyName);
    }

    async inputLossDate(lossDate) {
        await t.typeText(this.lossDateInput, lossDate);
    }
}
