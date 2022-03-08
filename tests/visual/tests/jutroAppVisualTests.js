import { verifyVisualSnapshot } from '@jutro/e2e-tests';
import { codelessForm } from '../selectors/AppCommonSelectors';
import { openJutroApplication } from '../../e2e/utils/RoleInitializer';

const getUrl = (url = '') => `${process.env.DEPLOY_URL}/${url}`;
const isVisible = selector => selector.with({ visibilityCheck: true }).exists;

fixture`Jutro App`.beforeEach(async () => {
    await openJutroApplication();
});

test('Codeless Form page', async t => {
    await t.navigateTo(getUrl('forms/codeless'));
    await t.expect(isVisible(codelessForm)).ok();

    await verifyVisualSnapshot(t, codelessForm);
});
