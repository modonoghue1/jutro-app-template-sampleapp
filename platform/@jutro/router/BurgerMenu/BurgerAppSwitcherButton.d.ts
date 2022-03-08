/**
 * The `BurgerAppSwitcherButton` component is designed as a container for burgerMenu aooSwitcherAccordion
 *
 * @type {React.FC<PropTypes.InferProps<typeof burgerAppSwitcherButtonPropTypes>>}
 *
 * @returns {React.ReactElement}
 *
 */
export const BurgerAppSwitcherButton: React.FC<PropTypes.InferProps<typeof burgerAppSwitcherButtonPropTypes>>;
import React from "react";
import PropTypes from "prop-types";
declare namespace burgerAppSwitcherButtonPropTypes {
    const className: PropTypes.Requireable<string>;
    const title: PropTypes.Validator<import("@jutro/prop-types").IntlMessageShape>;
    const icon: PropTypes.Requireable<string>;
    const renderAppSwitcher: PropTypes.Requireable<(...args: any[]) => any>;
}
export {};
