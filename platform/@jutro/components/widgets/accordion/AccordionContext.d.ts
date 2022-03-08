export const AccordionContext: React.Context<{
    isAccordionOpen: () => boolean;
    toggleAccordionOpen: (...args: any[]) => void;
    stateCallBack: (...args: any[]) => void;
}>;
import React from "react";
