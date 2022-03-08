/**
 * ClickableCard
 * @type {React.FC<PropTypes.InferProps<typeof clickableCardPropTypes>>}
 *
 * @metadataType container
 */
export const ClickableCard: React.FC<PropTypes.InferProps<typeof clickableCardPropTypes>>;
import React from "react";
import PropTypes from "prop-types";
declare namespace clickableCardPropTypes {
    const id: PropTypes.Requireable<string>;
    const className: PropTypes.Requireable<string>;
    const children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    const onClick: PropTypes.Requireable<(...args: any[]) => any>;
    const disabled: PropTypes.Requireable<boolean>;
}
export {};
