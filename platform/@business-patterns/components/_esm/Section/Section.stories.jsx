/* eslint-disable react/jsx-no-literals */
import React from 'react';
import { MetadataForm } from '@jutro/uiconfig';

import { Card } from '../Card';
import { Section } from './Section';
import { AdjustableRow } from '../AdjustableRow';

export default {
    title: 'Business Components/Section',
    id: 'section',
    component: Section,
};

const defaultMetadata = {
    id: 'defaultExample',
    type: 'page',
    content: [
        {
            id: 'exampleContent',
            type: 'element',
            component: 'div',
            content: 'Example content',
        },
    ],
};

export const Basic = ({ uiProps, ...rest }) => (
    <Section {...rest}>
        <MetadataForm
            uiProps={uiProps}
            componentMap={{ Section, AdjustableRow }}
        />
    </Section>
);

Basic.args = {
    children: 'Content Example',
    title: 'Business Section Example',
};
Basic.argTypes = {
    uiProps: {
        control: {
            type: 'object',
        },
        defaultValue: defaultMetadata,
    },
};

export const SectionsStack = () => (
    <Card title="Sections Stack Example">
        <Section title="Top Sub Header">Top Content</Section>
        <Section title="Mid Top Sub Header">Mid Top Content</Section>
        <Section title="Mid Top Sub Header">Mid Bottom Content</Section>
        <Section title="Bottom Sub Header">Bottom Content</Section>
    </Card>
);

SectionsStack.storyName = 'Sections stack';
