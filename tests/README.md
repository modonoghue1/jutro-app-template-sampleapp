# jutro-tests

Table of Contents

=================

-   [jutro-tests](#jutro-tests)
    -   [Project purpose](#project-purpose)
    -   [Project structure](#project-structure)
        -   [Best practice](#best-practice)
    -   [Configuration](#configuration)
    -   [Running the tests](#running-the-tests)
        -   [Useful commands](#useful-commands)
        -   [Saucelabs support](#saucelabs-support)
    -   [Testing tools](#testing-tools)

## Project purpose

Provide easy and unified way for UI

## Project structure

-   tests - common execution methods for testcafe
-   tests/e2e/pages - page modals
-   tests/e2e/tests - files with e2e UI tests
-   tests/e2e/utils - common initialization methods
-   tests/visual/tests - files with visual tests

### Best practice

1. Create Page Model page with page description and actions related to Page [Page Model](./e2e/pages/CodelessFormPage.js)

2. Put tests into tests/<component name>Test.js file [Codeless Form Tests](./e2e/tests/CodelessFormTests.js)

## Configuration

1. To configure execution host:

-   There is .env file in jutro-app root folder where you can provide url for running app to test.
    By default it is DEPLOY_URL=localhost:3000

    ```bash
    export DEPLOY_URL='https://localhost:3000'
    ```

## Running the tests

1. Start the application. From the root folder:

    ```bash
    npm start
    ```

2. #####For e2e tests execute following command:

    ```bash
    npm run e2e-tests -- --browser=<browserName>
    ```

    as browserName you can set any browser you want to run

3. #####For visual tests:
   a) execute following command:

    ```bash
    npm run visual-tests -- --browser=<browserName>
    ```

    as browserName you can set any browser you want to run

    b) prepare the report:

    ```bash
     npm run prepare-visual-report
    ```

    c) refresh the page

4. Following additional parameters are available:

    - browser (string) - defines browser(s) to run test against
    - concurrency (integer) - number of concurrent browser instances
    - quarantineMode (boolean) - retry failed tests up to 3 times

### params for Visual

To update image snapshot use --updateSnapshot / -u

    ```bash
    npm run visual-tests -- --updateSnapshot
    ```

### Useful commands

1. Remote execution:

    ```bash
    testcafe remote <pathToTests>
    ```

    After running remote execution command, it will generate URL. You can open this URL on any device at the same network

2. QR Code:

    ```bash
    testcafe remote <pathToTests> --qr-code
    ```

    This command will generate qr-code, which you can scan with any device and run tests as well

### Saucelabs support

If there is need to add saucelabs support, follow the instruction:

1. Add 'testcafe-browser-provider-saucelabs' package to package.json

2. Export environment variables SAUCE_USERNAME and SAUCE_ACCESS_KEY

3. Find browser aliase by running:

```bash
testcafe -b saucelabs
```

4. Use alias as browserName argument:

```bash
npm test -- --browser="saucelabs:Samsung Galaxy S8 HD GoogleAPI Emulator@7.0"
```

## Testing tools

-   [Testcafe](https://github.com/DevExpress/testcafe) - Web Testing Framework. A tool for E2E testing based on NodeJS that is fairly easy to setup and use that supports both JavaScript and TypeScript.
-   [Saucelabs](https://wiki.saucelabs.com/display/public/DOCS/The+Sauce+Labs+Cookbook+Home) - Cloud-based Browser Provider. Allows users to run tests in the cloud on more than 700 different browser platform, operating system and device combinations, providing a comprehensive test infrastructure for automated and manual testing of desktop and mobile applications
