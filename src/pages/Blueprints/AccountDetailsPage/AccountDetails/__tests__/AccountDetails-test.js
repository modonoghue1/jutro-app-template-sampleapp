import React from 'react';
import { mountWithTranslatorContext } from '@jutro/test';
import { axe, toHaveNoViolations } from 'jest-axe';
import { AccountDetails } from '../AccountDetails';

expect.extend(toHaveNoViolations);

const prepareEditForm = props => {
    const wrapper = mountWithTranslatorContext(<AccountDetails {...props} />);
    wrapper.find('#editButton').at(0).simulate('click');
    return wrapper;
};

describe('AccountDetails', () => {
    const formData = {
        firstName: 'Katerina',
        lastName: 'Atmosphere',
        emailId: 'katerina@atmos.com',
        phoneNumber: '1112223333',
        primaryAddress: {
            address: '240 L',
            street: 'Winston Street',
            city: 'San Francisco',
            state: 'California',
            zipCode: 'CA 91402',
        },
        billingAddressSameAsPrimary: true,
        billingAddress: {},
        billDelivery: 'POST',
        billDeliveryEmailId: 'katerina@atmos.com',
    };

    it('renders default component', () => {
        const wrapper = mount(<AccountDetails formData={formData} />);
        expect(wrapper).toBeDefined();
    });

    it('shows first name', () => {
        const wrapper = mountWithTranslatorContext(
            <AccountDetails formData={formData} />
        );
        expect(wrapper.text()).toInclude(formData.firstName);
    });

    describe('edit form', () => {
        it('replaces Edit button with Cancel and Save', () => {
            const wrapper = prepareEditForm({ formData });
            expect(wrapper.find('#editButton').exists()).toBeFalsy();
            expect(wrapper.find('#cancelButton').exists()).toBeTruthy();
            expect(wrapper.find('#saveButton').exists()).toBeTruthy();
        });

        it('calls callback after clicking on save button with changed data', () => {
            const onSaveForm = jest.fn();
            const wrapper = prepareEditForm({ formData, onSaveForm });
            const newValue = '1234';
            wrapper
                .find('input#phoneNumber')
                .simulate('change', { target: { value: newValue } });
            wrapper.find('#saveButton').at(0).simulate('click');
            expect(onSaveForm).toHaveBeenCalledTimes(1);
            expect(onSaveForm).toHaveBeenCalledWith(
                expect.objectContaining({ phoneNumber: newValue })
            );
        });

        it('calls callback after clicking cancel button', () => {
            const onCancelForm = jest.fn();
            const wrapper = prepareEditForm({ formData, onCancelForm });
            wrapper.find('#cancelButton').at(0).simulate('click');
            expect(onCancelForm).toHaveBeenCalledTimes(1);
        });
    });

    it('has no a11y violations', async () => {
        const wrapper = mount(
            <main>
                <AccountDetails formData={formData} />
            </main>
        );
        const results = await axe(wrapper.getDOMNode());
        expect(results).toHaveNoViolations();
    });
});
