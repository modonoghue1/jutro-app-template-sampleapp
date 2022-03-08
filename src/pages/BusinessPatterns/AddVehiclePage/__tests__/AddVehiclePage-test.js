import React from 'react';
import { mountWithTranslatorContext, textWasTranslated } from '@jutro/test';
import { axe, toHaveNoViolations } from 'jest-axe';
import messages from '../AddVehiclePage.messages';
import { AddVehiclePage } from '../AddVehiclePage';

expect.extend(toHaveNoViolations);

describe('AddVehiclePage', () => {
    it('renders default component', () => {
        const wrapper = mount(<AddVehiclePage />);
        expect(wrapper).toBeDefined();
    });

    it('renders with default prop value', () => {
        const wrapper = mount(<AddVehiclePage />);
        expect(wrapper.props().title).toBe('sample');
    });

    it('renders with custom prop value', () => {
        const newTitle = 'newTitle';
        const wrapper = mount(<AddVehiclePage title={newTitle} />);
        expect(wrapper.props().title).toBe(newTitle);
    });

    it('renders with css class', () => {
        const wrapper = mount(<AddVehiclePage />);
        expect(wrapper.find('div').at(0).props().className).toBe(
            'addVehiclePage'
        );
    });

    it('renders with translation', () => {
        const wrapper = mountWithTranslatorContext(<AddVehiclePage />);
        textWasTranslated(wrapper.find('h2').first().text(), messages.label);
    });

    it('has no a11y violations', async () => {
        const wrapper = mount(
            <main>
                <AddVehiclePage />
            </main>
        );
        const results = await axe(wrapper.getDOMNode());
        expect(results).toHaveNoViolations();
    });
});
