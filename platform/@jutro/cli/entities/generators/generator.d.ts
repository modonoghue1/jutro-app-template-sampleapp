/**
 * Creates an instance of Hygen's code generation runner
 *
 * @param {Object} args - Additional arguments passed to Hygen's templates
 * @param {Array.<string>} config - Contains the generator and action name used by Hygen
 * @param {string} name - The name variable passed to Hygen's templates
 * @param {string} pathToTemplates - The directory containing templates that Hygen will utilize.
 */
export function generator({ args, config: [generate, action], name, pathToTemplates, }: any): Promise<import("hygen/dist/types").RunnerResult>;
