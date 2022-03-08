/**
 * Descriptor for the implementation of a interface specification.
 */
export default class ImplDescriptor {
    constructor(objOrFunc: any);
    instance: any;
    allPrototypes: any[];
    findPrototypeMember(name: any): any;
    getMembers(): (string | string[])[];
    getMember(name: any): any;
    hasMember(name: any): boolean;
}
