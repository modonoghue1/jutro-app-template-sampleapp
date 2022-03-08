/**
 * Decorator for indicating that a class is a service. A single instance of the
 * service class will be registered with the `ServiceManager`. May optionally
 * specify options: lazy loading, and contract implementation.
 * See {@link ServiceManager#register} for more information about available options.
 *
 * @param {string} id - The service id
 * @param {Record<string, any>} [options={}] - The options to use
 * @returns {function(*)} - The decorator function
 */
export default function service(id: string, options?: Record<string, any> | undefined): (arg0: any) => any;
