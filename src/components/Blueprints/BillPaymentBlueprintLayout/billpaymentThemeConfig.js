import { consumerThemeConfig } from '@jutro/theme-styles';

export const billPaymentThemeConfig = {
    name: 'billPaymentJutroTheme',
    prefix: 'billPaymentJutroTheme',
    rootStyle: {
        ...consumerThemeConfig.rootStyle,
        // override jutro-variables
        '--GW-BORDER-COLOR': '#333333',
        '--GW-BRAND-COLOR-1': '#007abc',
        '--GW-BRAND-COLOR-1-HOVER': '#0068a1', // calculated - darker by 14
        '--GW-BRAND-COLOR-1-ACTIVE': '#005989', // calculated - darker by 27
        '--GW-BUTTON-OUTLINED-BORDER-WIDTH': '1px',
        '--GW-BORDER-RADIUS': '8px',
        '--GW-FONT-SIZE-H2': '1.5rem',
        '--GW-SEPARATOR-COLOR': 'rgba(51, 51, 51, 0.4)',

        // theme variables
        '--APP-PRIMARY-COLOR': '#00528a',
        '--APP-SECONDARY-COLOR': '#65c6c4',
        '--APP-TERTIARY-COLOR': '#0060a2',
        '--APP-HEADER-HEIGHT': '269px',
        '--APP-SIDE-BAR-EXPANDED-WIDTH': '264px',
        '--APP-SIDE-BAR-COLLAPSED-WIDTH': '20px',
        '--APP-SIDE-BAR-EXPANDER-SIZE': '32px',
        '--APP-SIDE-BAR-EXPANDER-BACKGROUND-COLOR': '#fff',
        '--APP-SIDE-BAR-EXPANDER-BORDER-COLOR': '#00598b',
        '--APP-SIDE-BAR-EXPANDER-FONT-SIZE': '28px',
    },
};
