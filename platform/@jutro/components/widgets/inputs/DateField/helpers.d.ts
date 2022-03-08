export function formatDateToDataType(...args: any[]): import("@jutro/prop-types").DateValueShape;
export function parseDateShapeToDate(...args: any[]): Date;
export function isDateShapeInRange(...args: any[]): {
    fulfillMinRequirement: boolean;
    fulfillMaxRequirement: boolean;
};
