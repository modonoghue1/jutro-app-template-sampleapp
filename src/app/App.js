// @ts-check
import { AppFloorPlan } from '@jutro/floorplan';
import React, { useContext, useMemo, useState } from 'react';
import { AuthContext } from '@jutro/auth';
import { isObject, get, set, cloneDeep, merge } from 'lodash';
import '../styles/index.scss';
import floorPlanConfig from './App.metadata.json5';
import { CodelessForm } from '../pages/Forms/CodelessForm/CodelessForm';
import { Welcome } from '../pages/Welcome/Welcome';
import { Dashboard } from '../pages/Dashboard/Dashboard';
import { ClaimModal } from '../pages/Dashboard/ClaimOperations/ClaimModal';
import { ClaimDetailsPage } from '../pages/Dashboard/ClaimDetailsPage/ClaimDetailsPage';
import { FNOLWizard } from '../pages/Dashboard/FNOL/FNOLWizard';
import { AddVehiclePage } from '../pages/BusinessPatterns/AddVehiclePage/AddVehiclePage';
import { FloorPlanPage } from '../pages/FloorPlanPage/FloorPlanPage';
import { Info, TableOfContents } from '../pages/FloorPlanPage/SiderComponents';
import { Settings } from '../pages/Settings/Settings';
import styles from './App.module.scss';
import { SettingsProvider, useSetting } from '../context/SettingsContext';
import { APIContextProvider } from '../helpers/APIContextProvider';
import { BillPaymentFormPanel } from '../pages/Blueprints/BillPaymentForm/BillPaymentForm';
import { BillPaymentAccountDetailsPanel } from '../pages/Blueprints/AccountDetailsPage/AccountDetailsPage';
import { ApiExample } from '../pages/ApiExample/ApiExample';

const settingsRouteConfig = {
    title: {
        id: 'jutro-app.Pages.Settings.title',
        defaultMessage: 'Settings',
    },
    path: '/settings',
    exact: true,
    component: 'Settings',
    showOnNavBar: false,
};

const updateNavigationPlacementConfig = (config, newValue) => {
    if (!newValue) return config;
    config[0].showLeftSide = newValue === 'left';
    config[0].showSubHeader = newValue === 'top';
    config[0].sideRoutes = config[0].routes;
    return config;
};

export const componentMap = {
    Welcome,
    CodelessForm,
    Dashboard,
    ClaimDetailsPage,
    ClaimModal,
    FNOLWizard,
    AddVehiclePage,
    Settings,
    Info,
    TableOfContents,
    BillPaymentFormPanel,
    BillPaymentAccountDetailsPanel,
    ApiExample,
};

export const AppRoot = () => {
    const auth = useContext(AuthContext);
    const settingsAvailable = auth?.authenticated;
    const navigationPlacementSettings = useSetting('navPlacement');
    const currentNavigationPlacement = navigationPlacementSettings?.getValue();

    const [floorplanOverrides, setFloorplanOverrides] = useState({});
    const setFloorplanProps = (path, value) =>
        setFloorplanOverrides(overrides => {
            const updatedOverrides = cloneDeep(overrides);
            set(updatedOverrides, path, value);
            return updatedOverrides;
        });

    const floorPlans = useMemo(() => {
        const config = merge({ ...floorPlanConfig }, floorplanOverrides);
        if (settingsAvailable) {
            const routesPath = '["floorplan.default"].routes';
            const routes = [...get(config, routesPath), settingsRouteConfig];
            set(config, routesPath, routes);
        }
        return updateNavigationPlacementConfig(
            Object.values(config).filter(isObject),
            currentNavigationPlacement
        );
    }, [settingsAvailable, currentNavigationPlacement, floorplanOverrides]);
    if (process.env.NODE_ENV === 'production') {
        // @ts-ignore
        const DEV_TOOLS = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
        if (typeof DEV_TOOLS === 'object') {
            // eslint-disable-next-line
            for (const [key, value] of Object.entries(DEV_TOOLS)) {
                DEV_TOOLS[key] = typeof value === 'function' ? undefined : null;
            }
        }
    }

    const classNameMap = {
        sampleDropdownLink: styles.sampleDropdownLink,
    };
    const callbackMap = {
        trackClick: () => {},
    };

    return (
        <React.Fragment>
            <APIContextProvider>
                <AppFloorPlan
                    componentMap={{
                        ...componentMap,
                        FloorPlanPage: () => (
                            <FloorPlanPage
                                title="FloorPlan"
                                onFloorplanPropsChange={setFloorplanProps}
                                floorPlan={floorPlans.find(({ matches }) =>
                                    matches?.includes('/floorplan')
                                )}
                            />
                        ),
                    }}
                    floorPlans={floorPlans}
                    callbackMap={callbackMap}
                    classNameMap={classNameMap}
                />
            </APIContextProvider>
        </React.Fragment>
    );
};

export const App = () => (
    <SettingsProvider>
        <AppRoot />
    </SettingsProvider>
);
