/* eslint-disable no-template-curly-in-string */
import React, { useContext, useEffect, useState } from 'react';
import { MetadataForm } from '@jutro/uiconfig';
import { omit } from 'lodash';
import { useAPI } from '../../../../../helpers/useAPI';
import { FNOLWizardContext } from '../../FNOLWizardContext';
import { WizardPageWrapper } from '../WizardPageWrapper/WizardPageWrapper';
import uiProps from './ClaimSubmission.metadata.json5';

const claimConfig = {
    method: 'post',
    uri: '/claim/v1/claims',
    vars: [
        {
            name: 'claimId',
            path: '$.data.attributes.id',
        },
    ],
};
const contactsConfig = {
    method: 'post',
    uri: '/claim/v1/claims/${claimId}/contacts',
    vars: [
        {
            name: 'mickeyMouseId',
            path: '$.data.attributes.id',
        },
    ],
};
const selectionsConfig = {
    selections: [
        {
            uri: '${reporterUri}',
        },
        {
            uri: '${insuredUri}',
        },
        {
            uri: '${driverUri}',
        },
    ],
};
const vehicleConfig = {
    method: 'post',
    uri: '/claim/v1/claims/${claimId}/vehicle-incidents',
    vars: [
        {
            name: 'vehicleIncidentId',
            path: '$.data.attributes.id',
        },
    ],
};

export const ClaimSubmission = ({ id, title, wizardPageProps }) => {
    const { wizardData } = useContext(FNOLWizardContext);
    const [isFormValid] = useState(true);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [type, setType] = useState('success');
    const [message, setMessage] = useState(null);
    const claimAPI = useAPI();

    const overrideProps = {
        loader: {
            loading: isLoading,
        },
        submitButton: {
            disabled: isLoading,
            visible: !isVisible,
        },
        inlineNotification: {
            visible: isVisible,
            message: message,
            type: type,
        },
    };

    const injuredPersonList = wizardData?.injuredList?.map(person => {
        person.injuredPerson = {
            id: '${mickeyMouseId}',
        };

        person = omit(person, ['displayName', 'firstName', 'lastName', 'role']);

        return person;
    });

    const injuryIncidents = injuredPersonList?.map(person => ({
        body: {
            data: {
                attributes: person,
            },
        },
        method: 'post',
        uri: '/claim/v1/claims/${claimId}/injury-incidents',
        vars: [
            {
                name: 'mickeyUri',
                path: '$.data.attributes.injuredPerson.uri',
            },
        ],
    }));

    useEffect(() => {
        const onSubmitFNOL = async () => {
            let compositePayload = {};
            const pickedWizardData = { ...wizardData };
            pickedWizardData.claimInfo = omit(wizardData.claimInfo, [
                'accountOfLoss',
                'lossType',
            ]);
            const claimInfoResponse = {
                body: {
                    data: {
                        attributes: pickedWizardData?.claimInfo,
                    },
                },
                ...claimConfig,
            };

            const contactsResponse = pickedWizardData.contactList?.map(data => {
                return {
                    body: {
                        data: {
                            attributes: data,
                        },
                    },
                    ...contactsConfig,
                };
            });

            const vehicleLossResponse = {
                body: {
                    data: {
                        attributes: {
                            collision: true,
                            collisionPoint: {
                                code: '03',
                            },
                            damageDescription: wizardData.vehicleLoss?.externalDamages.toString(),
                            lossParty: {
                                code: 'insured',
                            },
                            severity: {
                                code: 'major-auto',
                            },
                        },
                    },
                },
                ...vehicleConfig,
            };

            contactsResponse
                ? (compositePayload = {
                      requests: [
                          claimInfoResponse,
                          vehicleLossResponse,
                          ...contactsResponse,
                          ...injuryIncidents,
                      ],
                      ...selectionsConfig,
                  })
                : (compositePayload = {
                      requests: [claimInfoResponse, vehicleLossResponse],
                      ...selectionsConfig,
                  });

            try {
                setIsLoading(true);
                const result = await claimAPI.compositeAPI(compositePayload);
                await claimAPI.submitClaim(result.id);
                setIsLoading(false);
                setIsVisible(true);
                setMessage(
                    `Claim with no ${result.claimNumber} has been submitted successfully .`
                );
            } catch (ex) {
                setType('error');
                setIsVisible(true);
                setIsLoading(false);
                const errorSet = ex.responses?.map(item => {
                    const responseErrors = item.requestError?.details?.reduce(
                        (acc, innerItem) => {
                            if (innerItem.message) {
                                acc = `${acc} \n ${innerItem.message}`;
                            }
                            return acc;
                        },
                        ''
                    );
                    return responseErrors;
                });
                setMessage(errorSet?.join('\r\n'));
            }
        };
        onSubmitFNOL();
    }, [wizardData, claimAPI, injuryIncidents]);

    return (
        <WizardPageWrapper
            id={id}
            title={title}
            wizardPageProps={wizardPageProps}
            isFormValid={isFormValid}
            onSubmit={setIsSubmitted}
        >
            <MetadataForm
                uiProps={uiProps['claim.confirmation.view']}
                data={wizardData}
                overrideProps={overrideProps}
                showRequired
                showErrors={isSubmitted}
            />
        </WizardPageWrapper>
    );
};
