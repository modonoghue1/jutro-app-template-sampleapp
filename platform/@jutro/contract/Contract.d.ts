/**
 * Represents the contract between the consumer of a
 * specification interface and the provider (or implementor).
 */
export default class Contract {
    /**
     * Factory method to create a new Contract based on the
     * given specification.
     * @param {Record<string, any>} specification - The contract specification
     * @returns {Contract} - The contract
     */
    static specify(specification: Record<string, any>): Contract;
    /**
     * Creates a new Contract with its specification.
     * @param {Record<string, any>} specification - The contract spec
     * @param {...Contract} extended - Extended Contracts
     */
    constructor(specification: Record<string, any>, ...extended: Contract[]);
    spec: any;
    hashFunc: (() => string) & _.MemoizedFunction;
    /**
     * Does the given instance adhere to this contract?
     * @param {Record<string, any>|function} implementor - The specification implementor
     * @returns {boolean} - True if instance is specification-compliant
     */
    implementedBy(implementor: Record<string, any> | Function): boolean;
    hash(): string;
    toString(): string;
}
import _ from "lodash";
