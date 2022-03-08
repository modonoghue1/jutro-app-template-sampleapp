import React from 'react';
import { Accordion, AccordionCard } from '@jutro/components';

export const TableOfContents = () => (
    <Accordion
        accordionStates={['card1']}
        boldFont
        closeOthers
        disabled={false}
        showFrame={false}
    >
        <AccordionCard
            chevron
            chevronAlignment="left"
            errorState={false}
            id="card1"
            isCollapsible
            title="First card"
        >
            First card content
        </AccordionCard>
        <AccordionCard
            chevron
            chevronAlignment="left"
            errorState={false}
            id="card2"
            isCollapsible
            title="Second card"
        >
            Second card content
        </AccordionCard>
        <AccordionCard
            chevron
            chevronAlignment="left"
            id="card3"
            isCollapsible
            title="Third card"
        >
            Third card content
        </AccordionCard>
    </Accordion>
);
