import { Selector } from 'testcafe';

export class OktaPage {
    constructor() {
        this.oktaContainer = Selector('body.auth.okta-container');
    }
}
