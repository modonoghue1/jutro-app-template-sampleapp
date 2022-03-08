import React from 'react';
import { mountWithTranslatorContext } from '@jutro/test';
import { axe, toHaveNoViolations } from 'jest-axe';
import { FloorPlanPage } from '../FloorPlanPage';

expect.extend(toHaveNoViolations);

describe('FloorPlanPage', () => {
    it('renders default component', () => {
        const wrapper = mountWithTranslatorContext(<FloorPlanPage />);
        expect(wrapper).toBeDefined();
    });

    it('renders with css class', () => {
        const wrapper = mountWithTranslatorContext(<FloorPlanPage />);
        expect(wrapper.find('div').at(0).props().className).toBe(
            'floorPlanPage'
        );
    });

    it('has no a11y violations', async () => {
        const wrapper = mountWithTranslatorContext(
            <main>
                <FloorPlanPage />
            </main>
        );
        const results = await axe(wrapper.getDOMNode());
        expect(results).toHaveNoViolations();
    });
});
