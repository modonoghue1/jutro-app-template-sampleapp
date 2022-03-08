// @ts-check
import React from 'react';
import { MetadataForm } from '@jutro/uiconfig';
import { getConfigValue } from '@jutro/config';
import { WatsonInterfaceComponent } from './WatsonInterfaceComponent/WatsonInterfaceComponent';
import uiProps from './ApiExample.metadata.json5';

const API_URL = getConfigValue('WATSON_API_URL');
const API_KEY = getConfigValue('WATSON_API_KEY');
const API_PARAMS = {
    model: 'en-US_BroadbandModel',
};

const buildUrl = (url, params) => {
    const formattedParams = Object.keys(params)
        .map(key => `${key}=${params[key]}`)
        .join('&');
    return `${url}?${formattedParams}`;
};

export const ApiExample = () => {
    const componentMap = {
        WatsonInterfaceComponent,
    };
    const overrideProps = {
        watsonInterfaceComponent: {
            apiUrl: buildUrl(API_URL, API_PARAMS),
            apiKey: API_KEY,
        },
    };
    return (
        <MetadataForm
            componentMap={componentMap}
            uiProps={uiProps['api-example-page']}
            overrideProps={overrideProps}
        />
    );
};
