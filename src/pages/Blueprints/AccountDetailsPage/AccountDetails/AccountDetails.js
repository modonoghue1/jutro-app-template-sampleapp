import React, {
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { cloneDeep, set } from 'lodash';
import PropTypes from 'prop-types';
import { TranslatorContext } from '@jutro/locale';
import { MetadataForm, validateMetadata } from '@jutro/uiconfig';
import styles from './AccountDetails.module.scss';
import uiMetadata from './AccountDetails.metadata.json5';
import messages from './AccountDetails.messages';
import { PanelsHeader } from '../../../../components/Blueprints/PanelsHeader';

const addressShape = PropTypes.shape({
    addressLine1: PropTypes.string,
    addressLine2: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    postalCode: PropTypes.string,
    country: PropTypes.string,
});

const userDataShape = PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    emailId: PropTypes.string,
    phoneNumber: PropTypes.string,
    primaryAddress: addressShape,
    billingAddress: addressShape,
    billingAddressSameAsPrimary: PropTypes.bool,
    billDelivery: PropTypes.oneOf(['POST', 'EMAIL']),
    billDeliveryEmailId: PropTypes.string,
});

const accountDetailsPropTypes = {
    /**
     * Data to display in the form
     */
    formData: userDataShape.isRequired,
    /**
     * Callback when save button is clicked.
     */
    onSaveForm: PropTypes.func,
    /**
     * Callback when cancel button is clicked. Should return false to keep editing.
     */
    onCancelForm: PropTypes.func,
    /**
     * The key required for Google Maps API
     */
    googleMapsApiKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
        .isRequired,
    /**
     * Disables editing first name and last name.
     */
    disableEditingName: PropTypes.bool,
};

const formatAddressSummary = address =>
    [
        address.addressLine1,
        address.addressLine2,
        [address.postalCode, address.city, address.state]
            .filter(Boolean)
            .join(', '),
        address.country,
    ]
        .filter(Boolean)
        .join(`\n`);

export const AccountDetails = ({
    formData,
    onSaveForm,
    onCancelForm,
    googleMapsApiKey,
    disableEditingName,
}) => {
    const translator = useContext(TranslatorContext);

    useEffect(() => {
        validateMetadata(uiMetadata);
    }, []);

    const [data, setData] = useState({
        formData,
        readOnly: true,
    });

    const primaryAddressSummary = useMemo(
        () => formatAddressSummary(formData.primaryAddress),
        [formData.primaryAddress]
    );

    const billingAddressSummary = useMemo(
        () =>
            data.formData.billingAddressSameAsPrimary
                ? translator(messages.billingAddressSameAsPrimary)
                : formatAddressSummary(formData.billingAddress),
        [
            data.formData.billingAddressSameAsPrimary,
            formData.billingAddress,
            translator,
        ]
    );

    const billDeliverySummary = useMemo(() => {
        switch (data.formData.billDelivery) {
            case 'EMAIL':
                return `${translator(messages.billDeliveryByEmail)} (${
                    data.formData.billDeliveryEmailId
                })`;
            case 'POST':
                return translator(messages.billDeliveryByPost);
            default:
                return undefined;
        }
    }, [data, translator]);

    const billDeliveryAvailableValues = useMemo(
        () => [
            { code: 'POST', name: translator(messages.billDeliveryByPost) },
            { code: 'EMAIL', name: translator(messages.billDeliveryByEmail) },
        ],
        [translator]
    );

    const callbackMap = useMemo(
        () => ({
            onEditButtonClick: () => setData(d => ({ ...d, readOnly: false })),
            onSaveButtonClick: () => {
                onSaveForm(data.formData);
                setData(d => ({ ...d, readOnly: true }));
            },
            onCancelButtonClick: () => {
                if (onCancelForm(data.formData) !== false) {
                    setData({ formData, readOnly: true });
                }
            },
            renderPanelHeader: PanelsHeader,
            onMapValueChange: newValue => {
                setData(d => ({
                    ...d,
                    formData: { ...d.formData, primaryAddress: newValue },
                }));
            },
        }),
        [data.formData, formData, onSaveForm, onCancelForm]
    );

    const writeValue = useCallback((value, path) => {
        setData(d => set(cloneDeep(d), path, value));
    }, []);

    const getDOMSafeProperty = value => (value ? 'true' : false);

    const overrideProps = useMemo(
        () => ({
            addressAndBillingViewForm: {
                visible: getDOMSafeProperty(data.readOnly),
            },
            addressAndBillingEditForm: {
                visible: getDOMSafeProperty(!data.readOnly),
            },
            primaryAddressSummary: {
                value: primaryAddressSummary,
            },
            billingAddressSummary: {
                value: billingAddressSummary,
            },
            billDeliverySummary: {
                value: billDeliverySummary,
            },
            billDelivery: {
                availableValues: billDeliveryAvailableValues,
            },
            billDeliveryEmailId: {
                disabled: data.formData.billDelivery !== 'EMAIL',
            },
            billingAddressEditForm: {
                visible: getDOMSafeProperty(
                    !data.formData.billingAddressSameAsPrimary
                ),
            },
            currentLocationMap: {
                googleMapsApiKey,
                defaultValue: data.formData.primaryAddress,
            },
            firstName: {
                disabled: disableEditingName,
            },
            lastName: {
                disabled: disableEditingName,
            },
            editButton: {
                visible: getDOMSafeProperty(data.readOnly),
            },
            cancelButton: {
                visible: getDOMSafeProperty(!data.readOnly),
            },
            saveButton: {
                visible: getDOMSafeProperty(!data.readOnly),
            },
            '@field': {
                readOnly: data.readOnly,
            },
        }),
        [
            data.readOnly,
            data.formData.billingAddressSameAsPrimary,
            data.formData.primaryAddress,
            data.formData.billDelivery,
            primaryAddressSummary,
            billingAddressSummary,
            billDeliverySummary,
            billDeliveryAvailableValues,
            disableEditingName,
            googleMapsApiKey,
        ]
    );

    return (
        <div className={styles.accountDetails}>
            <MetadataForm
                uiProps={uiMetadata['account.details.view']}
                data={data}
                callbackMap={callbackMap}
                overrideProps={overrideProps}
                onDataChange={writeValue}
            />
        </div>
    );
};

AccountDetails.propTypes = accountDetailsPropTypes;

AccountDetails.defaultProps = {
    disableEditingName: true,
    onCancelForm: () => {},
};
