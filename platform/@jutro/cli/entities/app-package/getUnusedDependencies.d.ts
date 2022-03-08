export function getUnusedDependencies(packagePath: any, ignoredDependencies?: string): Promise<{
    path: any;
    invalidDirs: any;
    invalidFiles: any;
    missing: any;
    dependencies: any;
    devDependencies: any;
}>;
export type Options = {
    packagesPath?: string;
    toBeIgnored?: string[];
    ignoredPackages?: string[];
    ignoredDependencies?: string;
    subPath?: string;
    isLogCaptured?: boolean;
    basePath: string;
};
/**
 * getUnusedDependencies
 */
export type Data = {
    missing: string[];
    unused: string[];
    errors: string[];
};
