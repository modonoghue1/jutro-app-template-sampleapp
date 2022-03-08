/** Jutro ecommerce is just wrapper for Google Analytics Enhanced Ecomemrce. More info here -
 * https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce
 */
/**
 * @typedef {object} ImpressionData
 *
 * Represents information about a product that has been viewed.
 *
 * @prop {string} id - The product ID or SKU (e.g. P67890). *Either this field or name must be set.
 * @prop {string} name - The name of the product (e.g. Android T-Shirt). *Either this field or id must be set.
 * @prop {string} list - The list or collection to which the product belongs (e.g. Search Results)
 * @prop {string} brand	- The brand associated with the product (e.g. Google).
 * @prop {string} category - The category to which the product belongs (e.g. Apparel). Use / as a delimiter to specify up to 5-levels of hierarchy (e.g. Apparel/Men/T-Shirts).
 * @prop {string} variant - The variant of the product (e.g. Black).
 * @prop {number} position - The product's position in a list or collection (e.g. 2).
 * @prop {number} price	- The price of a product (e.g. 29.20).
 */
/**
 * @typedef {object} ProductData
 *
 * Product data represents individual products that were viewed, added to the shopping cart, etc.
 *
 * @prop {string} id - The product ID or SKU (e.g. P67890). *Either this field or name must be set.
 * @prop {string} name - The name of the product (e.g. Android T-Shirt). *Either this field or id must be set.
 * @prop {string} brand - the brand associated with the product (e.g. Google).
 * @prop {string} category - The category to which the product belongs (e.g. Apparel). Use / as a delimiter to specify up to 5-levels of hierarchy (e.g. Apparel/Men/T-Shirts).
 * @prop {string} variant - The variant of the product (e.g. Black).
 * @prop {number} price - The price of a product (e.g. 29.20).
 * @prop {number} quantity - The quantity of a product (e.g. 2).
 * @prop {string} coupon - The coupon code associated with a product (e.g. SUMMER_SALE13).
 * @prop {number} position - The product's position in a list or collection (e.g. 2).
 */
/**
 * @typedef {object} ActionData
 *
 * Represents information about an ecommerce related action that has taken place.
 *
 * @prop {string} id - The transaction ID (e.g. T1234). *Required if the action type is purchase or refund.
 * @prop {string} affiliation - The store or affiliation from which this transaction occurred (e.g. Google Store).
 * @prop {number} revenue - Specifies the total revenue or grand total associated with the transaction (e.g. 11.99). This value may include shipping, tax costs, or other adjustments to total revenue that you want to include as part of your revenue calculations. Note: if revenue is not set, its value will be automatically calculated using the product quantity and price fields of all products in the same hit.
 * @prop {number} tax - The total tax associated with the transaction.
 * @prop {number} shipping - The shipping cost associated with the transaction.
 * @prop {string} coupon - The transaction coupon redeemed with the transaction.
 * @prop {string} list - The list that the associated products belong to. Optional.
 * @prop {number} step - A number representing a step in the checkout process. Optional on checkout actions.
 * @prop {string} option - Additional field for checkout and checkout_option actions that can describe option information on the checkout page, like selected payment method.
 */
/**
 * @typedef {object} EventData
 *
 * @prop {string} eventCategory	- Typically the object that was interacted with (e.g. 'Video')
 * @prop {string} eventAction - The type of interaction (e.g. 'play')
 * @prop {string} eventLabel -Useful for categorizing events (e.g. 'Fall Campaign')
 */
/**
 * `productView` is related to appearance of product in such places as search results, recommendation lists, thumbnails.
 *
 * @param {ImpressionData|Array} [productImpressions] - single `{ImpressionData}` or array of `{ImpressionData}`
 */
export function productView(productImpressions?: any[] | ImpressionData | undefined): void;
/**
 * `productDetailView` should be used when particular product detail page is displayed.
 *
 * @param {ProductData|Array} [products] - single `{ProductData}` or array of `{ProductData}`
 */
export function productDetailView(products?: any[] | ProductData | undefined): void;
/**
 * `clickProductLink` - expresses interest in this particular product by clicking on the product listing to view more details.
 *
 * @param {ProductData|Array} [products] - single `{ProductData}` or array of `{ProductData}`
 * @param {ActionData} [actionProps] - `{ActionData}` object
 * @param {EventData} [eventProps] - optional `{EventData}` object to override default ga generic event props
 */
export function clickProductLink(products?: any[] | ProductData | undefined, actionProps?: ActionData | undefined, eventProps?: EventData | undefined): void;
/**
 * `addToCart` - expresses intent to buy the item by adding it to a shopping cart.
 *
 * @param {ProductData|Array} [products] - single `{ProductData}` or array of `{ProductData}`
 * @param {ActionData} [actionProps] - `{ActionData}` object
 * @param {EventData} [eventProps] - optional `{EventData}` object to override default ga generic event props
 */
export function addToCart(products?: any[] | ProductData | undefined, actionProps?: ActionData | undefined, eventProps?: EventData | undefined): void;
/**
 * `removeFromCart` - expresses removal of the item from a  shopping cart.
 *
 * @param {ProductData|Array} [products] - single `{ProductData}` or array of `{ProductData}`
 * @param {ActionData} [actionProps] - `{ActionData}` object
 * @param {EventData} [eventProps] - optional `{EventData}` object to override default ga generic event props
 */
export function removeFromCart(products?: any[] | ProductData | undefined, actionProps?: ActionData | undefined, eventProps?: EventData | undefined): void;
/**
 * `checkoutStepView` - its related to display specific checkout page like shipping, payment, summary etc...
 *
 * @param {ProductData|Array} [products] - single `{ProductData}` or array of `{ProductData}`
 * @param {ActionData} [actionProps] - `{ActionData}` object
 */
export function checkoutStepView(products?: any[] | ProductData | undefined, actionProps?: ActionData | undefined): void;
/**
 * Enhancement for `checkoutStepView` (which sends data just on pageview).
 * `addCheckoutOption` allows you to send additional data related to current checkout step.
 * For example selecting shipment option from dropdown could be send as additional checkout option.
 *
 * @param {ProductData|Array} [products] - single `{ProductData}` or array of `{ProductData}`
 * @param {ActionData} [actionProps] - `{ActionData}` object
 * @param {EventData} [eventProps] - optional `{EventData}` object to override default ga generic event props
 */
export function addCheckoutOption(products?: any[] | ProductData | undefined, actionProps?: ActionData | undefined, eventProps?: EventData | undefined): void;
/**
 * `purchaseView` - corresponds to display final page of purchase process, which means user did transaction succesfully.
 *
 * @param {ProductData|Array} [products] - single `{ProductData}` or array of `{ProductData}`
 * @param {ActionData} [actionProps] - `{ActionData}` object
 */
export function purchaseView(products?: any[] | ProductData | undefined, actionProps?: ActionData | undefined): void;
/**
 * Represents information about a product that has been viewed.
 */
export type ImpressionData = {
    /**
     * - The product ID or SKU (e.g. P67890). *Either this field or name must be set.
     */
    id: string;
    /**
     * - The name of the product (e.g. Android T-Shirt). *Either this field or id must be set.
     */
    name: string;
    /**
     * - The list or collection to which the product belongs (e.g. Search Results)
     */
    list: string;
    /**
     * - The brand associated with the product (e.g. Google).
     */
    brand: string;
    /**
     * - The category to which the product belongs (e.g. Apparel). Use / as a delimiter to specify up to 5-levels of hierarchy (e.g. Apparel/Men/T-Shirts).
     */
    category: string;
    /**
     * - The variant of the product (e.g. Black).
     */
    variant: string;
    /**
     * - The product's position in a list or collection (e.g. 2).
     */
    position: number;
    /**
     * - The price of a product (e.g. 29.20).
     */
    price: number;
};
/**
 * Product data represents individual products that were viewed, added to the shopping cart, etc.
 */
export type ProductData = {
    /**
     * - The product ID or SKU (e.g. P67890). *Either this field or name must be set.
     */
    id: string;
    /**
     * - The name of the product (e.g. Android T-Shirt). *Either this field or id must be set.
     */
    name: string;
    /**
     * - the brand associated with the product (e.g. Google).
     */
    brand: string;
    /**
     * - The category to which the product belongs (e.g. Apparel). Use / as a delimiter to specify up to 5-levels of hierarchy (e.g. Apparel/Men/T-Shirts).
     */
    category: string;
    /**
     * - The variant of the product (e.g. Black).
     */
    variant: string;
    /**
     * - The price of a product (e.g. 29.20).
     */
    price: number;
    /**
     * - The quantity of a product (e.g. 2).
     */
    quantity: number;
    /**
     * - The coupon code associated with a product (e.g. SUMMER_SALE13).
     */
    coupon: string;
    /**
     * - The product's position in a list or collection (e.g. 2).
     */
    position: number;
};
/**
 * Represents information about an ecommerce related action that has taken place.
 */
export type ActionData = {
    /**
     * - The transaction ID (e.g. T1234). *Required if the action type is purchase or refund.
     */
    id: string;
    /**
     * - The store or affiliation from which this transaction occurred (e.g. Google Store).
     */
    affiliation: string;
    /**
     * - Specifies the total revenue or grand total associated with the transaction (e.g. 11.99). This value may include shipping, tax costs, or other adjustments to total revenue that you want to include as part of your revenue calculations. Note: if revenue is not set, its value will be automatically calculated using the product quantity and price fields of all products in the same hit.
     */
    revenue: number;
    /**
     * - The total tax associated with the transaction.
     */
    tax: number;
    /**
     * - The shipping cost associated with the transaction.
     */
    shipping: number;
    /**
     * - The transaction coupon redeemed with the transaction.
     */
    coupon: string;
    /**
     * - The list that the associated products belong to. Optional.
     */
    list: string;
    /**
     * - A number representing a step in the checkout process. Optional on checkout actions.
     */
    step: number;
    /**
     * - Additional field for checkout and checkout_option actions that can describe option information on the checkout page, like selected payment method.
     */
    option: string;
};
export type EventData = {
    /**
     * - Typically the object that was interacted with (e.g. 'Video')
     */
    eventCategory: string;
    /**
     * - The type of interaction (e.g. 'play')
     */
    eventAction: string;
    /**
     * -Useful for categorizing events (e.g. 'Fall Campaign')
     */
    eventLabel: string;
};
