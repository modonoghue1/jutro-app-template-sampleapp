"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = `diff --git a/README.md b/README.md
index c0cb1a0..da702e5 100644
--- a/README.md
+++ b/README.md
@@ -1,21 +1,56 @@
 # Jutro sample app
+
 This is a sample React app that uses Jutro. [Read more on the Jutro documentation site](https://jutro.guidewire.com/docs/dev/scaffolding/)
 
+# Application Structure
+
+## .jutro
+
+This folder contains all log files.
+
+## i18n
+
+This folder contains auto-generated temporary files that simply hold the UI strings that have been extracted from src/**. Do not manually edit them, or check them into source control. .gitignore is already configured to ignore these files.
+
+## src
+
+This folder contains the application source:
+
+> \`app\`
+> This folder contains App.js files which export the Jutro class that we use as the application entry component. It provides a basic UI application structure with [floorplan](https://jutro-master.int.ccs.guidewire.net/jutro-storybook/?path=/docs/floorplans-using-floorplans--page) to have consistent user experience and UI across Guidewire.
+
+> \`assets\`
+> This folder contains all assets needed for this application.
+
+> \`config\`
+> This folder contains the application configuration file "config.json" to configure this application.
+
+> \`i18n\`
+> This folder contains all generated translation files. Translators will use these files as a basis for further translations.
+
+> \`Pages\`
+> This folder contains all the navigation pages used by this application. The presentation metadata for each page is defined in the .metadata.json5 file.
+
+> \`themes\`
+> This folder contains .scss files to support application theme.
+
+## tests
+> This folder contains all application test files for e2e and visual tests using TestCafe.
+
 # Useful commands
+
 To install dependencies:
-\`\`\`
-npm install
-\`\`\`
+
+## \`npm install\`
 
 To run in interactive mode:
-\`\`\`
-npm start
-\`\`\`
 
-To build a deployment instance
-\`\`\`
-npm run build
-\`\`\`
+## \`npm start\`
+
+To build a deployment instance.
+Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
+
+## \`npm run build\`
 
 The project was built assuming it is hosted at the server root.
 To override this, specify the homepage in your \`package.json\`.
@@ -32,4 +67,181 @@ Add it as a root-level property, for example:
 \`\`\`
 
 # Versioning and upgrades
-Information about subsequent versions and upgrade steps is [here](https://jutro.guidewire.com/versions/)
\\ No newline at end of file
+
+Information about subsequent versions and upgrade steps is [here](https://jutro.guidewire.com/versions/)
+
+# Available Scripts
+
+In the project directory, you can run:
+
+## \`npm run depcheck\`
+
+This command checks the dependency declaration in the package.json file and creates a log file with missing dependencies details if any have been found.
+
+## \`npm run e2e-tests\`
+
+This command runs TestCafe that opens a browser and runs tests on a working application.
+See the section about [tests](https://jutro.guidewire.com/docs/dev/testing)
+
+## \`npm run e2e-tests:dev\`
+
+This command runs TestCafe in development mode. It opens a browser and runs tests on a working application.
+See the section about [tests](https://jutro.guidewire.com/docs/dev/testing)
+
+## \`npm run i18n\`
+
+To generate pseudo translations.
+
+## \`npm run lerna\`
+
+To control the Jutro-app by lerna configuration.
+
+## \`npm run lint\`
+
+To run linter on your commits.
+
+## \`npm run lint:css\`
+
+To avoid errors and enforce conventions in your styles.
+
+## \`npm run lint:js\`
+
+To statically analyze your code and find problems in JavaScript files.
+
+## \`npm run postbuild\`
+
+To generate pseudo translations.
+
+## \`npm run postbuild:dev\`
+
+To generate pseudo translations in development environment.
+
+## \`npm run prebuild\`
+
+To write build information for the application to a JSON file.
+
+## \`npm run prepare-visual-report\`
+
+To create a visual report.
+
+## \`npm run prestart\`
+
+To write build information for the application to a JSON file and check Jutro's version.
+
+## \`npm run prettier\`
+
+To enforce consistent style by parsing your code.
+
+## \`npm run prettier-check\`
+
+To check if specifield files are formatted. The output of the command are messages and a list of unformatted files.
+
+## \`npm run prettier-check-files\`
+
+To check if files for given extensions are formatted. The output of the command are messages and a list of unformatted files.
+for eg. \`npm run prettier-check-files **/*.scss*\`
+
+## \`npm run start\`
+
+To start the application.
+
+## \`npm run test\`
+
+To run the jest tests.
+
+## \`npm run test:ci\`
+
+To run jest tests in CI environment.
+
+## \`npm run validate-file-structure\`
+
+To verify your project in line with the recommended naming conventions. Using the recommended naming conventions makes future upgrades easier.
+
+## \`npm run visual-tests\`
+
+To run screenshot-based tests in a headless mode. It creates a screenshot of the given element and compares it to the previous screenshot.
+See the section about [tests](https://jutro.guidewire.com/docs/dev/testing)
+
+## \`npm run write-build-info\`
+
+To write build information for the application to a JSON file.
+
+# Additional features
+
+## \`jutro-cli\`
+
+'jutro-cli' includes several utility commands that you can use with a Jutro application, for example if your application doesn't have Auth enabled or doesn't have TSM integration, commit hooks, and so on, then you can enable them using jutro-cli.
+
+See the section about [How to use jutro-cli](https://jutro.guidewire.com/docs/dev/cli/)
+
+### Available commands for jutro-cli
+
+##### \`add-ons\`
+
+To add features (please see below sub commands) to your Jutro Application.
+
+> 1. \`enable-analytics\`
+>    To enable Analytics ( Google, MixPanel) into your application.
+
+> 2. \`update-commit-hooks\`
+>    To update whether or not recommended commit hooks are enabled (ESLint, Prettier, stylelint, commit message).
+
+> 3. \`upgrade-modal\`
+>    To replace the deprecated Modal component with Jutro Modal Next, available since Jutro 2.0.x.
+
+> 4. \`add-auth\`
+>    To add Okta authentication into your application.
+
+##### \`environment-info\`
+
+To get environment information.
+
+##### \`write-build-info|build-info\`
+
+To write build information for the application to a JSON file.
+
+##### \`i18n\`
+
+To merge translations or extract messages.
+
+##### \`update\`
+
+To update the jutro-cli package.
+
+##### \`update-app\`
+
+To upgrade the Jutro application.
+
+##### \`check-version\`
+
+To check and compare the jutro-app package version with the latest.
+
+##### \`check-dependencies\`
+
+To check whether the required dependencies have been declared in package.json.
+
+##### \`update-metadata-schema\`
+
+To retrieve the latest metadata schema definition.
+
+##### \`check-deprecated\`
+
+To check for deprecated packages and prompt for their removal.
+
+##### \`codemods\`
+
+To apply Codemods to refactor the code.
+
+##### \`ui-metadata|ui\`
+
+To add features (please see below sub commands) to your Jutro Application.
+
+> 1. \`migrate-version\`
+>    To update metadata files version without migrating the logic.
+
+> 2. \`migrate\`
+>    To migrate UI Metadata to a newer version.
+
+##### \`validate-metadata|validate\`
+
+To validate UI Metadata.
\\ No newline at end of file
`;
exports.default = _default;
//# sourceMappingURL=diff.js.map