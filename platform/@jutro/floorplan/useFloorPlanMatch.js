import _slicedToArray from"@babel/runtime-corejs3/helpers/slicedToArray";import{useMemo}from"react";import{useLocation,matchPath}from"react-router-dom";import{isFloorPlanOverride,isFloorPlanDefault}from"./helpers";export default function useFloorPlanMatch(floorPlans){const location=useLocation(),_useMemo=useMemo((()=>[floorPlans.find(isFloorPlanDefault),floorPlans.filter(isFloorPlanOverride)]),[floorPlans]),_useMemo2=_slicedToArray(_useMemo,2),defaultFloorPlan=_useMemo2[0],floorPlanOverrides=_useMemo2[1];return useMemo((()=>{const matchedFloorplanOverride=floorPlanOverrides.find((({matches:matches})=>(Array.isArray(matches)?matches:[matches]).some((pathMatch=>matchPath(location.pathname,pathMatch)))));return{...defaultFloorPlan,...matchedFloorplanOverride}}),[defaultFloorPlan,floorPlanOverrides,location.pathname])}