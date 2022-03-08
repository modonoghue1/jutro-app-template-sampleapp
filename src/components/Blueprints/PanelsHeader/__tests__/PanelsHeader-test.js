import React from 'react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { mountWithTranslatorContext, textWasTranslated } from '@jutro/test';
import { PanelsHeader } from '../PanelsHeader';

expect.extend(toHaveNoViolations);

describe('PanelsHeader', () => {
    it('renders default component', () => {
        const wrapper = mount(<PanelsHeader />);
        expect(wrapper).toBeDefined();
    });

    it('renders with custom prop value', () => {
        const newTitle = 'newTitle';
        const newId = 'newId';
        const wrapper = mount(<PanelsHeader title={newTitle} id={newId} />);
        expect(wrapper.props().title).toBe(newTitle);
        expect(wrapper.props().id).toBe(newId);
    });

    it('renders with css class', () => {
        const wrapper = mount(<PanelsHeader />);
        expect(wrapper.find('div').first().props().className).toBe(
            'panelHeader'
        );
    });

    it('has no a11y violations', async () => {
        const wrapper = mount(
            <main>
                <PanelsHeader title="test" />
            </main>
        );
        const results = await axe(wrapper.getDOMNode());
        expect(results).toHaveNoViolations();
    });

    it('translates title if intl message is passed', () => {
        const intlMessage = {
            id: 'message.id',
            defaultMessage: 'Default message',
        };
        const wrapper = mountWithTranslatorContext(
            <PanelsHeader title={intlMessage} />
        );
        const span = wrapper.find('div span').first();

        textWasTranslated(span.text(), intlMessage);
    });
});
