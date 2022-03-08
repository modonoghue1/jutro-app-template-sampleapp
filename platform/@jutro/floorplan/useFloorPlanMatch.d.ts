import type { FloorPlan, FloorPlans } from './AppFloorPlan';
/**
 * Overrides the default floorplan with the floorplans that match the
 * current path, if any
 *
 * @param {FloorPlans} floorPlans Object containing the floorplan and the overrides
 * @returns {FloorPlan} FloorPlan with the matching override applied if necessary
 */
export default function useFloorPlanMatch(floorPlans: FloorPlans): FloorPlan;
