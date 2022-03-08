import React from 'react';
import { mountWithTranslatorAndRouterContext } from '@jutro/test';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ActionTitleBar } from '@jutro/lab-preview-components';
import { Settings } from '../Settings';

expect.extend(toHaveNoViolations);

describe('Settings Page', () => {
    const wrapper = mountWithTranslatorAndRouterContext(
        <main>
            <Settings />
        </main>
    );

    it('has no a11y violations', async () => {
        const results = await axe(wrapper.getDOMNode());
        expect(results).toHaveNoViolations();
    });

    it('should render card headers with the correct class name', () => {
        const actionTitleBars = wrapper.find(ActionTitleBar);

        expect(actionTitleBars.length).toEqual(4);
        actionTitleBars.forEach(titleBar => {
            expect(
                titleBar.find(`[className*="actionTitleBarContainer"]`).exists()
            ).toBeTruthy();
        });
    });
});
