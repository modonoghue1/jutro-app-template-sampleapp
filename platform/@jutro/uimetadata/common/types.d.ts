export declare const metadataTypes: {
    readonly ACTION: "action";
    readonly ELEMENT: "element";
    readonly CONTAINER: "container";
    readonly FIELD: "field";
    readonly ITERABLE: "iterable";
    readonly LAYOUT: "layout";
    readonly COMPONENT: "component";
};
/**
 * returns component metadata type
 * @param {object} component
 * @returns {string|undefined}
 */
export declare const getComponentMetadataType: (component: any, content: any) => any;
