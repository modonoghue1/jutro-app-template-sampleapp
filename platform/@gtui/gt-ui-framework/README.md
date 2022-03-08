# GT UI Framework
A framework of library modules, helper functions and utilities to be used in GT UI.

## Publishing Library to Artifactory

This library has to be published to the artifactory so that it can be used as dependency in GT UI.

### via TeamCity Job

Library can be published to artifactory using Teamcity job,
[Publish GT-UI-Framework](https://gwre-devexp-ci-production-devci.gwre-devops.net/buildConfiguration/PortfolioAutomation_PortfolioLeinster_PortfolioMunster_GtUi_PublishGTUIFramework?mode=branches)

### via Command Line

Library can be published from the repository using the below commands
```
npm install
npm build
npm publish
```
---
##  NPM Registry Repo Information

### Repo addresses

-   **Repo address**: [https://artifactory.guidewire.com/portfoliomunster-npm-dev-local](https://artifactory.guidewire.com/portfoliomunster-npm-dev-local)


-   **Virtual repo**: [https://artifactory.guidewire.com/portfoliomunster-npm-dev/](https://artifactory.guidewire.com/portfoliomunster-npm-dev/). This is a combination of the [actual porfoliomunster npm repo](https://artifactory.guidewire.com/portfoliomunster-npm-dev-local)  and the [Artifactory copy of the public NPM registry.](https://artifactory.guidewire.com/api/npm/npm-registry-remote/)

### Delete file from repo

Files can only be deleted through the REST service using the sys-portfolio user. The [actual porfoliomunster npm repo](https://artifactory.guidewire.com/portfoliomunster-npm-dev-local) address needs to be used in the request.


#### Delete from NPM repo request
```

URL: https://artifactory.guidewire.com/portfoliomunster-npm-dev-local/<locationToFile>

Method: DELETE

Headers:

Authentication (Basic username:password)
```


Note: Replace '<locationToFile>' with the full location to the package you want to delete e.g. "@gtui/gt-ui-framework/-/@gtui/gt-ui-framework-0.0.1-SNAPSHOT-20200514102637.tgz"

