/**
 * The Service registry.
 */
export default class ServiceRegistry {
    registrations: {};
    implementations: {};
    /**
     * Registers a Service by a unique identifier. Service registration for a given
     * id may only be done once; subsequent calls are no-ops.
     * Options consists of:
     * 1. lazy (boolean): If true, the service instance is lazily instantiated upon first use.
     * 2. implements (Contract|Array<Contract>): one or more Contract(s) that the service implements
     * 3. attributes (Object): Key-value searchable attributes (useful for resolving contract implementations)
     * @param {string} id - The Service id
     * @param {Function} Service - The Service class
     * @param {object} options - Registration options
     */
    register(id: string, Service: Function, options?: object): void;
    /**
     * Does this registry have a service with the given id?
     * @param {string} id - The service id
     * @returns {boolean} - True if registration exists
     */
    hasRegistration(id: string): boolean;
    /**
     * Returns the registration for the given service, if it exists.
     * @param {string} id - The service id
     * @returns {Registration|undefined} - The registration for the service
     */
    getRegistration(id: string): Registration | undefined;
    /**
     * Returns the ids of all the currently registered services.
     * @returns {string[]} - The registration ids
     */
    getRegistrationIds(): string[];
    /**
     * @typedef {object} Contract
     * @prop
     */
    /**
     * Returns all registrations that represent services that
     * @param {Contract} contract - The contract to get implementors for
     * @returns {Array<any>} - The array of implementors
     */
    getImplementorsOf(contract: Contract): Array<any>;
}
export type Contract = {
    "": any;
};
/**
 * Represents a service registration.
 */
declare class Registration {
    /**
     * Creates the registration
     * @param {string} id - The service id
     * @param {Function} Service - The service class (constructor)
     * @param {boolean} lazy - True if service is lazily instantiated
     */
    constructor(id: string, Service: Function, lazy: boolean);
    id: string;
    name: string;
    attributes: {};
    service: any;
    init: Function | undefined;
    /**
     * Associate (searchable) attributes with this registration.
     * @param {object} attributes - key-value attributes
     */
    associate(attributes: object): void;
    /**
     * Returns metadata associated with
     * @returns {object} - Service registration metadata
     */
    getMetadata(): object;
    /**
     * Is this service lazily instantiated?
     * @returns {boolean} - True if service is lazily instantiated
     */
    isLazy(): boolean;
    /**
     * Initializes a lazily instantiated service.
     */
    initializeService(): void;
    /**
     * Returns the registered service. If service is lazily instantiated,
     * this will create the instance of the service.
     * @returns {object} - The service instance
     */
    getService(): object;
}
export {};
