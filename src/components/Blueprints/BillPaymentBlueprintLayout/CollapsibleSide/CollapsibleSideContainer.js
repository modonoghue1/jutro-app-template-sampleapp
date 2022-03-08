// @ts-check
import React, { useContext } from 'react';
import { Avatar, Accordion, AccordionCard, Button } from '@jutro/components';
import { TranslatorContext } from '@jutro/locale';
import { ButtonLink } from '@jutro/router';
import messages from './CollapsibleSide.messages';
import { CollapsibleSide } from './CollapsibleSide';
import { CollapsibleSideBlock } from './CollapsibleSideBlock';
import styles from './CollapsibleSide.module.scss';

export const CollapsibleSideContainer = () => {
    const translator = useContext(TranslatorContext);

    const user = {
        name: 'User Name',
        mail: 'support@company.com',
        phone: '111-222-3333',
    };

    const cards = [
        {
            title: translator(messages.carPolicies),
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="white"
                    viewBox="0 0 24 24"
                >
                    <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
                </svg>
            ),
        },
        {
            title: translator(messages.homePolicies),
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="white"
                    viewBox="0 0 24 24"
                >
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                </svg>
            ),
        },
    ];

    const checkIcon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="#a3d043"
            viewBox="0 0 24 24"
        >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
        </svg>
    );

    return (
        <CollapsibleSide>
            <div className={styles.avatar}>
                <Avatar id="Avatar" username={user.name} />
                <span>{user.name}</span>
            </div>
            <CollapsibleSideBlock title="MY POLICIES">
                <Accordion
                    boldFont
                    closeOthers
                    defaultOpenedId="card1"
                    disabled={false}
                    id="Accordion"
                    showFrame={false}
                    className={styles.accordion}
                >
                    <AccordionCard
                        chevron
                        chevronAlignment="right"
                        errorState={false}
                        id="card1"
                        cardBodyClassName={styles.accordionCardBody}
                        cardTitleClassName={styles.accordionCardHeader}
                        title={
                            <div>
                                <span>{cards[0].icon}</span>
                                <span>{cards[0].title}</span>
                                <span>{checkIcon}</span>
                            </div>
                        }
                    >
                        <ul>
                            <li>
                                <ButtonLink
                                    to="/blueprints/bill"
                                    type="text"
                                    className={styles.buttonLink}
                                    fullWidth
                                >
                                    {translator(messages.policyDetailsLink)}
                                </ButtonLink>
                            </li>
                            <li>
                                <ButtonLink
                                    to="/blueprints/bill"
                                    type="text"
                                    className={styles.buttonLink}
                                    fullWidth
                                >
                                    {translator(messages.billsLink)}
                                </ButtonLink>
                            </li>
                            <li>
                                <ButtonLink
                                    to="/blueprints/bill"
                                    type="text"
                                    className={styles.buttonLink}
                                    fullWidth
                                >
                                    {translator(messages.carsLink)}
                                </ButtonLink>
                            </li>
                            <li>
                                <ButtonLink
                                    to="/blueprints/bill"
                                    type="text"
                                    className={styles.buttonLink}
                                    fullWidth
                                >
                                    {translator(messages.driversLink)}
                                </ButtonLink>
                            </li>
                            <li>
                                <ButtonLink
                                    to="/blueprints/bill"
                                    type="text"
                                    className={styles.buttonLink}
                                    fullWidth
                                >
                                    {translator(messages.documentsLink)}
                                </ButtonLink>
                            </li>
                        </ul>
                    </AccordionCard>
                    <AccordionCard
                        chevron
                        chevronAlignment="right"
                        errorState={false}
                        id="card2"
                        cardBodyClassName={styles.accordionCardBody}
                        cardTitleClassName={styles.accordionCardHeader}
                        title={
                            <div>
                                <span>{cards[1].icon}</span>
                                <span>{cards[1].title}</span>
                                <span>{checkIcon}</span>
                            </div>
                        }
                    >
                        <ul>
                            <li>
                                <ButtonLink
                                    to="/blueprints/bill"
                                    type="text"
                                    className={styles.buttonLink}
                                    fullWidth
                                >
                                    {translator(messages.policyDetailsLink)}
                                </ButtonLink>
                            </li>
                            <li>
                                <ButtonLink
                                    to="/blueprints/bill"
                                    type="text"
                                    className={styles.buttonLink}
                                    fullWidth
                                >
                                    {translator(messages.billsLink)}
                                </ButtonLink>
                            </li>
                            <li>
                                <ButtonLink
                                    to="/blueprints/bill"
                                    type="text"
                                    className={styles.buttonLink}
                                    fullWidth
                                >
                                    {translator(messages.carsLink)}
                                </ButtonLink>
                            </li>
                            <li>
                                <ButtonLink
                                    to="/blueprints/bill"
                                    type="text"
                                    className={styles.buttonLink}
                                    fullWidth
                                >
                                    {translator(messages.driversLink)}
                                </ButtonLink>
                            </li>
                            <li>
                                <ButtonLink
                                    to="/blueprints/bill"
                                    type="text"
                                    className={styles.buttonLink}
                                    fullWidth
                                >
                                    {translator(messages.documentsLink)}
                                </ButtonLink>
                            </li>
                        </ul>
                    </AccordionCard>
                </Accordion>
            </CollapsibleSideBlock>
            <Button type="outlined" className={styles.button}>
                {translator(messages.newQuote)}
            </Button>
            <CollapsibleSideBlock title="MY ACCOUNT">
                <ButtonLink
                    to="/blueprints/bill"
                    icon="mi-account-circle"
                    type="text"
                    className={styles.buttonLink}
                    fullWidth
                >
                    {translator(messages.billsLink)}
                </ButtonLink>
                <ButtonLink
                    to="/blueprints/account/details"
                    icon="mi-receipt"
                    type="text"
                    className={styles.buttonLink}
                    fullWidth
                >
                    {translator(messages.accountDetailsLink)}
                </ButtonLink>
            </CollapsibleSideBlock>
            <CollapsibleSideBlock title="HELP AND SUPPORT">
                <ButtonLink
                    href={`mailto:${user.mail}`}
                    icon="mi-mail"
                    type="text"
                    className={styles.buttonLink}
                    fullWidth
                >
                    {user.mail}
                </ButtonLink>
                <ButtonLink
                    href={`tel:+${user.phone}`}
                    icon="mi-phone"
                    type="text"
                    className={styles.buttonLink}
                    fullWidth
                >
                    {user.phone}
                </ButtonLink>
            </CollapsibleSideBlock>
        </CollapsibleSide>
    );
};
