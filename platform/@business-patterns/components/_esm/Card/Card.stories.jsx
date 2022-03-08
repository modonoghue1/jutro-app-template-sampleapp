import React from 'react';
import { MetadataForm } from '@jutro/uiconfig';

import { Card } from './Card';
import { Section } from '../Section';
import { AdjustableRow } from '../AdjustableRow';

const defaultMetadata = {
    id: 'defaultExample',
    type: 'page',
    content: [
        {
            id: 'exampleContent',
            type: 'container',
            component: 'Section',
            componentProps: {
                title: 'Example section',
            },
            content: 'Example content',
        },
    ],
};

export const Basic = ({ uiProps, ...rest }) => (
    <Card {...rest}>
        <MetadataForm
            uiProps={uiProps}
            componentMap={{ Section, AdjustableRow }}
        />
    </Card>
);

Basic.args = {
    text: 'Card',
    title: 'Business Card Example',
};

export default {
    title: 'Business Components/Card',
    id: 'card',
    component: Card,
    argTypes: {
        maxWidth: {
            control: {
                type: 'range',
                min: 360,
                max: 1024,
                step: 20,
            },
        },
        uiProps: {
            control: {
                type: 'object',
            },
            defaultValue: defaultMetadata,
        },
    },
};
