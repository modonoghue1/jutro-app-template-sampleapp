import React, { useContext, useEffect } from 'react';
import { ThemeContext } from '@jutro/theme';
import { defaultThemeConfig } from '@jutro/theme-styles';
import { Flex } from '@jutro/layout';
import { billPaymentThemeConfig } from './billpaymentThemeConfig';
import { CollapsibleSideContainer } from './CollapsibleSide';
import styles from './BillPaymentBlueprintLayout.module.scss';

export const BillPaymentBlueprintLayout = ({ children }) => {
    const theme = useContext(ThemeContext);
    useEffect(() => {
        const defaultThemeName = defaultThemeConfig.name;
        const desiredThemeName = billPaymentThemeConfig.name;
        const currentThemeName = theme.name;
        if (currentThemeName !== desiredThemeName) {
            theme.switchTheme(billPaymentThemeConfig);
        }
        return () => {
            if (
                currentThemeName === desiredThemeName &&
                currentThemeName !== defaultThemeName
            ) {
                theme.switchTheme(defaultThemeConfig);
            }
        };
    }, [theme]);
    return (
        <Flex
            wrap={false}
            gap="none"
            alignItems="stretch"
            className={styles.blueprint}
        >
            <CollapsibleSideContainer />
            {children}
        </Flex>
    );
};
