import { RequestLogger } from 'testcafe';
import { openJutroApplication } from '../utils/RoleInitializer';
import CodelessFormPage from '../pages/CodelessFormPage';
import { JutroAppToolbarPage } from '../pages/JutroAppToolbarPage';

const jutroAppToolbar = new JutroAppToolbarPage();
const codelessFormPage = new CodelessFormPage();

const gaCollect = 'https://www.google-analytics.com/collect';
const gaLogger = RequestLogger(
    { gaCollect },
    {
        logRequestHeaders: true,
        logRequestBody: true,
    }
);

fixture`Codeless Form Page`.requestHooks(gaLogger).beforeEach(async () => {
    await openJutroApplication();
    await jutroAppToolbar.openCodelessFormPage();
});

if (process.env.REACT_APP_GA_TRACKING_ID) {
    test('Check that page interactions generate google analytics requests', async t => {
        await t.typeText(codelessFormPage.initialValueInput, '2020', {
            replace: true,
        });
        await t
            .expect(
                gaLogger.contains(record =>
                    record.request.url.match(
                        /ea=JUTRO_TOPICS.VALUE_CHANGED&el=baseData.initialValue/
                    )
                )
            )
            .ok();
    });
}
