import React from 'react';
import { mountWithTranslatorAndRouterContext } from '@jutro/test';
import { Image, Panel } from '@jutro/components';
import { axe, toHaveNoViolations } from 'jest-axe';

import { Welcome } from '../Welcome';

expect.extend(toHaveNoViolations);

describe('Welcome Page', () => {
    it('Renders the Welcome page', () => {
        const wrapper = shallow(<Welcome />);
        expect(wrapper.exists()).toBe(true);
    });

    it('has no a11y violations', async () => {
        const wrapper = mountWithTranslatorAndRouterContext(
            <main>
                <Welcome />
            </main>
        );
        const results = await axe(wrapper.getDOMNode());
        expect(results).toHaveNoViolations();
    });

    it('Renders main image in Welcome page', () => {
        const wrapper = mountWithTranslatorAndRouterContext(<Welcome />);
        const image = wrapper.find(Image);
        expect(image.exists()).toBe(true);
    });

    it('Renders sections in Welcome page', () => {
        const wrapper = mountWithTranslatorAndRouterContext(<Welcome />);
        const sections = wrapper.find(Panel);
        expect(sections.length).toBe(2);
    });
});
