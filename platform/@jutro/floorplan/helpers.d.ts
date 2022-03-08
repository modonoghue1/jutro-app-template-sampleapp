import type { FloorPlan, FloorPlanOverride } from './AppFloorPlan';
export declare function isFloorPlanOverride(floorPlan: FloorPlan | FloorPlanOverride): floorPlan is FloorPlanOverride;
export declare function isFloorPlanDefault(floorPlan: FloorPlan | FloorPlanOverride): floorPlan is FloorPlan;
