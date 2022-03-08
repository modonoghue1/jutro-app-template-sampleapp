/**
 * This function updates the dependencies and scripts in a Jutro app, based on the dependencies
 * and scripts currently used in jutro-app under jutro-main.
 * The template files under `templatesDir` represent a snapshot of how jutro-app's dependencies
 * and scripts looked for a particular version of Jutro.
 * This function will find the next version (e.g if consumers is 1.0.1 then try to bump to 1.0.2 or 1.0.3 etc)
 * read the template for the version, and then merge the application package with the template
 * to form the updated consumer application package.
 *
 * @param {object} params - params
 * @param {object} params.applicationPackage - application package.json file
 * @param {object} params.templatePackage - templatePackage to use to update
 * @param {string} params.packagePath - where to read app package
 * @param {Array<string>} params.fieldsToUpdate - the package fields to update - default is all fields
 * @returns {boolean} - true if the package was updated, false otherwise
 */
export function updateApplicationPackage({ applicationPackage, currentVersion: currentApplicationVersion, fieldsToUpdate, getChangesToMerge, packagePath, templatePackage, }: {
    applicationPackage: object;
    templatePackage: object;
    packagePath: string;
    fieldsToUpdate: Array<string>;
}): boolean;
