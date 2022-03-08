import { openJutroApplication } from '../utils/RoleInitializer';
import CodelessFormPage from '../pages/CodelessFormPage';
import { JutroAppToolbarPage } from '../pages/JutroAppToolbarPage';

const codelessFormPage = new CodelessFormPage();
const jutroAppToolbar = new JutroAppToolbarPage();

fixture`Codeless Form Page`.beforeEach(async () => {
    await openJutroApplication();
    await jutroAppToolbar.openCodelessFormPage();
});

test('Check that it is not possible to submit form if required fields are not filled', async t => {
    await codelessFormPage.submitForm();
    await t
        .expect(codelessFormPage.errorMessageSelector.exists)
        .ok('Error message did not appear');
    await t.click(codelessFormPage.errorMessageCloseButtonSelector);
    await t
        .expect(codelessFormPage.errorMessageSelector.exists)
        .notOk('Error message did not close');
});

test('Check that codeless DropdownMenu renders correctly', async t => {
    await t
        .expect(
            codelessFormPage.externalLinksButton.with({ visibilityCheck: true })
                .exists
        )
        .ok()
        .click(codelessFormPage.externalLinksButton)
        .expect(
            codelessFormPage.externalLinksMenu.with({ visibilityCheck: true })
                .exists
        )
        .ok()
        .expect(
            codelessFormPage.externalLinksHeader1.with({
                visibilityCheck: true,
            }).exists
        )
        .ok()
        .expect(
            codelessFormPage.externalLinksHeader1.with({
                visibilityCheck: true,
            }).innerText
        )
        .eql('Heating')
        .expect(
            codelessFormPage.externalLinksLink1.with({ visibilityCheck: true })
                .exists
        )
        .ok()
        .expect(
            codelessFormPage.externalLinksLink1.with({ visibilityCheck: true })
                .innerText
        )
        .eql("Beginner's Guide")
        .expect(
            codelessFormPage.externalLinksSeparator.with({
                visibilityCheck: true,
            }).exists
        )
        .ok()
        .expect(
            codelessFormPage.externalLinksHeader2.with({
                visibilityCheck: true,
            }).exists
        )
        .ok()
        .expect(
            codelessFormPage.externalLinksHeader2.with({
                visibilityCheck: true,
            }).innerText
        )
        .eql('Electrical')
        .expect(
            codelessFormPage.externalLinksLink2.with({ visibilityCheck: true })
                .exists
        )
        .ok()
        .expect(
            codelessFormPage.externalLinksLink2.with({ visibilityCheck: true })
                .innerText
        )
        .eql("Expert's Guide");
});

test('Check that codeless DropdownMenuButton renders correctly', async t => {
    await t
        .expect(
            codelessFormPage.internalLinksButton.with({ visibilityCheck: true })
                .exists
        )
        .ok()
        .click(codelessFormPage.internalLinksButton)
        .expect(
            codelessFormPage.internalLinksMenu.with({ visibilityCheck: true })
                .exists
        )
        .ok()
        .expect(
            codelessFormPage.internalLinksHeader1.with({
                visibilityCheck: true,
            }).exists
        )
        .ok()
        .expect(
            codelessFormPage.internalLinksHeader1.with({
                visibilityCheck: true,
            }).innerText
        )
        .eql('Forms')
        .expect(
            codelessFormPage.internalLinksLink1.with({ visibilityCheck: true })
                .exists
        )
        .ok()
        .expect(
            codelessFormPage.internalLinksLink1.with({ visibilityCheck: true })
                .innerText
        )
        .eql('TPS Reports')
        .expect(
            codelessFormPage.internalLinksSeparator.with({
                visibilityCheck: true,
            }).exists
        )
        .ok()
        .expect(
            codelessFormPage.internalLinksHeader2.with({
                visibilityCheck: true,
            }).exists
        )
        .ok()
        .expect(
            codelessFormPage.internalLinksHeader2.with({
                visibilityCheck: true,
            }).innerText
        )
        .eql('FAQs')
        .expect(
            codelessFormPage.internalLinksLink2.with({ visibilityCheck: true })
                .exists
        )
        .ok()
        .expect(
            codelessFormPage.internalLinksLink2.with({ visibilityCheck: true })
                .innerText
        )
        .eql('How To Use A Keyboard');
});
