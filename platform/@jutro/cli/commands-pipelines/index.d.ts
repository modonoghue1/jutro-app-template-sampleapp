export { migrateMetadata } from "./ui-metadata-pipelines";
export { addAuth, migrateUsingFeatureSnapshot, updateAnalyticsConfig, updateCommitHooks } from "./add-ons-pipelines";
export { checkAppVersion, checkDependencies, checkEnvironment, checkFolderStructure, checkMetadata } from "./check-pipelines";
export { generateBuildInfo, generateComponent, generatePage, generatePackageTemplate, generateSnapshot } from "./generator-pipelines";
export { extractMessages, extractMessagesJSX, generatePseudo, mergeTranslations, mergeBizCompTranslations } from "./internationalization-pipelines";
export { applyCodemods, clearDeprecated, updateApp, updateAppShell, updateDependencies, updateMetadataSchema, updateModule, updateScripts, updateCss } from "./update-pipelines";
