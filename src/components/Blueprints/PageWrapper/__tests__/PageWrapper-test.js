import React from 'react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { mountWithTranslatorContext, textWasTranslated } from '@jutro/test';
import { PageWrapper } from '../PageWrapper';

expect.extend(toHaveNoViolations);

describe('PageWrapper', () => {
    it('renders default component', () => {
        const wrapper = mount(<PageWrapper />);
        expect(wrapper).toBeDefined();
    });

    it('renders with custom prop value', () => {
        const newTitle = 'newTitle';
        const wrapper = mount(<PageWrapper title={newTitle} />);
        expect(wrapper.props().title).toBe(newTitle);
    });

    it('renders with css class', () => {
        const wrapper = mount(<PageWrapper />);
        expect(wrapper.find('div').first().props().className).toBe(
            'pageWrapper'
        );
    });

    it('has no a11y violations', async () => {
        const wrapper = mount(
            <main>
                <PageWrapper title="test" />
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
            <PageWrapper title={intlMessage} />
        );
        const title = wrapper.find('h1').first();

        textWasTranslated(title.text(), intlMessage);
    });
});
