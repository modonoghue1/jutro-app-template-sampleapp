import React from 'react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Button, Chevron } from '@jutro/components';
import { CollapsibleSide } from '../CollapsibleSide';
import styles from '../CollapsibleSide.module.scss';

expect.extend(toHaveNoViolations);

describe('CollapsibleSide', () => {
    it('renders default component', () => {
        const wrapper = mount(<CollapsibleSide />);
        expect(wrapper).toBeDefined();
    });

    it('renders with given children', () => {
        const wrapper = mount(
            <CollapsibleSide>
                <Button type="text">
                    <Chevron />
                </Button>
            </CollapsibleSide>
        );
        const button = wrapper.find('button[type="button"]').first();
        const chevron = wrapper.find(Chevron).first();
        expect(button.exists()).toBe(true);
        expect(button.prop('className')).toInclude(`${styles.expanderButton}`);
        expect(chevron.exists()).toBe(true);
        expect(chevron.prop('className')).toInclude(`${styles.expanderIcon}`);
    });

    it('renders with css class by default', () => {
        const wrapper = mount(<CollapsibleSide />);
        expect(wrapper.find('div').first().props().className).toBe(
            'sideColumn expandedSideColumn'
        );
    });

    it('has no a11y violations', async () => {
        const wrapper = mount(
            <main>
                <CollapsibleSide />
            </main>
        );
        const results = await axe(wrapper.getDOMNode());
        expect(results).toHaveNoViolations();
    });
});
