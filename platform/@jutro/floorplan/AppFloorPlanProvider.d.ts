import React from 'react';
import { FloorPlan } from './AppFloorPlan';
/**
 * Context for managing AppFloorPlan default values from Jutro, for example
 * when embedded in micro-apps
 */
export declare const AppFloorPlanContext: React.Context<FloorPlan>;
/**
 * A provider for the AppFloorPlanContext, allowing AppFloorPlan props default values
 * to be managed from the context, for example, when embedded in micro-apps
 */
export declare const AppFloorPlanContextProvider: React.FC<FloorPlan>;
