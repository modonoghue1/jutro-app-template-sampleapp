export function migrate({ currentVersion, metadataFilesToMigrate: filesToMigrate, schemaFiles, skipVersionMigration, snapshot, }: {
    currentVersion: any;
    metadataFilesToMigrate: any;
    schemaFiles: any;
    skipVersionMigration?: boolean | undefined;
    snapshot: any;
}): Promise<void>;
