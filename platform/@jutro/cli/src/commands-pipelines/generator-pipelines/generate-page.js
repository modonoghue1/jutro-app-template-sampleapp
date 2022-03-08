"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generatePage = void 0;

var _cliSnapshotTools = require("@jutro/cli-snapshot-tools");

var _get = _interopRequireDefault(require("lodash/get"));

var _isNil = _interopRequireDefault(require("lodash/isNil"));

var _upperFirst = _interopRequireDefault(require("lodash/upperFirst"));

var _jscodeshift = _interopRequireDefault(require("jscodeshift"));

var _path = require("path");

var _pipelines = require("../../entities/pipelines");

var _appPackage = require("../../entities/app-package");

var _prompts = require("../../entities/prompts");

var _updatePipelines = require("../update-pipelines");

var _uiMetadataPipelines = require("../ui-metadata-pipelines");

var _generateComponent = require("./generate-component");

var _logging = require("../../entities/logging");

const APP_FLOOR_PLAN = 'AppFloorPlan';
const COMPONENT_MAP = 'componentMap';
const CURRENT_VERSION = '0.0.0-base-template';

const getToVersion = name => `999.0.1-add-page-${name}`;

const generationMessages = {
  warnings: {
    jutroVersion: 'Could not parse the jutro application version',
    jutroApplicationPackage: 'Your package.json does not contain jutro dependencies'
  },
  errors: {
    emptyName: 'Name of component cannot be empty'
  }
};
const types = [{
  title: 'component (default)',
  value: 'component'
}, {
  title: 'form',
  value: 'form'
}, {
  title: 'wizard',
  value: 'wizard'
}];
const componentQuestions = [{
  type: 'text',
  name: 'name',
  message: 'Please provide the name of the new page component',
  validate: name => (0, _prompts.validateName)(name)
}, {
  type: 'text',
  name: 'path',
  message: 'Please provide the path for component',
  initial: (0, _path.resolve)(process.cwd(), 'src', 'pages'),
  validate: path => (0, _prompts.validatePathName)(path) ? true : "Invalid path (only alphanumeric and '-', '_', '@', '.', '/', '\\' characters allowed)"
}, {
  type: 'select',
  name: 'type',
  message: 'Please select the type of component for your page',
  choices: types,
  defaultChoice: 'component'
}];

const applicationValidationCheck = async () => {
  const pkg = (0, _appPackage.getConsumerApplicationPackage)();

  if ((0, _isNil.default)(pkg)) {
    await (0, _prompts.promptConfirmation)(generationMessages.warnings.jutroVersion);
    return;
  }

  const jutroVersion = (0, _appPackage.getConsumerApplicationVersion)();
  if ((0, _isNil.default)(jutroVersion)) await (0, _prompts.promptConfirmation)(generationMessages.warnings.jutroApplicationPackage);
};

const promptAppLevelComponentMapPath = async ({
  pathToComponentMap,
  fromCi
}) => (0, _prompts.singlePrompt)({
  type: 'text',
  name: 'inputAppLevelComponentMapPath',
  message: 'What is the path to the App.js file?',
  initial: './src/app/App.js'
}, fromCi, pathToComponentMap);

const promptAppRoutesPath = async ({
  pathToAppRoutes,
  fromCi
}) => (0, _prompts.singlePrompt)({
  type: 'text',
  name: 'inputAppRputesPath',
  message: 'What is the path to the App.metadata.json5 file?',
  initial: './src/app/App.metadata.json5'
}, fromCi, pathToAppRoutes);

const isAppFloorPlanDefined = source => source.find(_jscodeshift.default.JSXOpeningElement).some(({
  value
}) => (0, _get.default)(value, ['name', 'name'], '').includes(APP_FLOOR_PLAN));

const generateCodemod = ({
  name,
  pathToNewComponent
}) => [{
  description: `add ${name} to componentMap`,
  execute: source => {
    const handleUpdate = ({
      value
    }) => {
      const objectValue = _jscodeshift.default.identifier(name);

      const objectKey = _jscodeshift.default.identifier(name);

      const newProperty = _jscodeshift.default.objectProperty(objectKey, objectValue);

      value.properties.push(newProperty);
    };

    if (!isAppFloorPlanDefined(source)) {
      (0, _logging.logYellow)(`unable to find component ${APP_FLOOR_PLAN}, make sure to add your new page to the app level ${COMPONENT_MAP} if needed`);
      return source;
    }

    let componentMapRef = {};
    source.find(_jscodeshift.default.JSXOpeningElement).filter(({
      value
    }) => (0, _get.default)(value, ['name', 'name'], '').includes(APP_FLOOR_PLAN)).some(({
      value
    }) => {
      const variableDefinedReference = value.attributes.find(({
        value: attributeValue
      }) => attributeValue.expression.name === COMPONENT_MAP);
      componentMapRef = {
        ref: variableDefinedReference
      };

      if (componentMapRef.ref) {
        return true;
      }

      const inlineObjectReference = value.attributes.find(({
        name: objectName
      }) => objectName.name === COMPONENT_MAP);
      componentMapRef = {
        ref: inlineObjectReference,
        isInline: true
      };

      if (componentMapRef.ref) {
        return true;
      }

      return false;
    });

    if (componentMapRef.ref && componentMapRef.isInline) {
      return source.find(_jscodeshift.default.ObjectExpression, {
        start: componentMapRef.ref.value.expression.start
      }).forEach(handleUpdate);
    }

    if (componentMapRef.ref && !componentMapRef.isInline) {
      return source.find(_jscodeshift.default.ObjectExpression).filter(({
        parentPath
      }) => (0, _get.default)(parentPath, ['value', 'id', 'name'], '') === componentMapRef.ref.value.expression.name).forEach(handleUpdate);
    }

    return source.find(_jscodeshift.default.JSXOpeningElement).filter(({
      value
    }) => (0, _get.default)(value, ['name', 'name'], '').includes(APP_FLOOR_PLAN)).forEach(({
      value
    }) => {
      const componentMapPropName = _jscodeshift.default.jsxIdentifier(COMPONENT_MAP);

      const componentMapPropValueAndKey = _jscodeshift.default.identifier(name);

      const newProperty = _jscodeshift.default.objectProperty(componentMapPropValueAndKey, componentMapPropValueAndKey);

      const newObjectExpression = _jscodeshift.default.objectExpression([newProperty]);

      const newExpressionContainer = _jscodeshift.default.jsxExpressionContainer(newObjectExpression);

      const newProp = _jscodeshift.default.jsxAttribute(componentMapPropName, newExpressionContainer);

      value.attributes.push(newProp);
    });
  }
}, {
  description: `add import for ${name}`,
  execute: source => {
    if (!isAppFloorPlanDefined(source)) {
      return source;
    }

    return source.insertImportSpecifier(name, pathToNewComponent);
  }
}];

const actionTypes = {
  addPageToRoutes: '[ JUTRO ] ADD_PAGE_TO_ROUTES'
};

const addPageToRoutes = () => ({
  type: actionTypes.addPageToRoutes
});

const addPageToRoutesAction = name => metadata => ({ ...metadata,
  routes: [...metadata.routes, {
    title: {
      id: `jutro-app.Pages.${name}.title`,
      defaultMessage: name
    },
    path: `/${name}`,
    exact: !name.includes('Wizard'),
    component: name
  }]
});

const filterOnce = () => {
  let filtered = false;
  return metadata => {
    if (!filtered && metadata && metadata.routes) {
      filtered = true;
      return true;
    }

    return false;
  };
};

const generateUiMetadataMigration = name => {
  const routesFilter = filterOnce();
  return {
    reducer: (0, _cliSnapshotTools.createReducer)({
      [actionTypes.addPageToRoutes]: addPageToRoutesAction(name)
    }),
    migration: [{
      filter: routesFilter,
      actions: [addPageToRoutes()]
    }]
  };
};

const generatePage = (0, _pipelines.PipelineWithLogs)({
  logStartMessage: 'Generate page',
  logFileName: 'jutro-page-generation.log'
}).setup(async ({
  name: pageName,
  path: pathToPageComponent,
  pathToAppRoutes,
  pathToComponentMap,
  skipCheck,
  skipSetup,
  type: pageType
}) => {
  if (!skipCheck) await applicationValidationCheck();

  const _await$promptComponen = await (0, _prompts.promptComponentGeneration)(componentQuestions, {
    name: (0, _upperFirst.default)(pageName),
    path: pathToPageComponent,
    type: pageType
  }),
        internalName = _await$promptComponen.name,
        path = _await$promptComponen.path,
        type = _await$promptComponen.type;

  if (!internalName || internalName.length === 0) throw Error(generationMessages.errors.emptyName);
  const name = type === 'wizard' ? `${internalName}Wizard` : internalName;
  const pathToAppLevelComponentMap = await promptAppLevelComponentMapPath({
    pathToComponentMap,
    fromCi: skipSetup
  });
  const pathToAppRoutesFile = await promptAppRoutesPath({
    pathToAppRoutes,
    fromCi: skipSetup
  });
  const toVersion = getToVersion(name);
  const snapshots = [{
    codemods: {
      migration: generateCodemod({
        name: (0, _upperFirst.default)(name),
        pathToNewComponent: (0, _path.relative)((0, _path.dirname)((0, _path.resolve)(process.cwd(), pathToAppLevelComponentMap)), (0, _path.resolve)(path, name))
      })
    },
    uiMetadata: generateUiMetadataMigration(name),
    name: 'addNewPageComponent',
    version: toVersion
  }];
  return {
    pageName: name,
    pathToPageComponent: path,
    snapshots,
    pathToAppRoutesFile,
    pathToAppLevelComponentMap,
    toVersion,
    pageType: type
  };
}).addStep(async ({
  templatesPath,
  pageName,
  pathToPageComponent,
  pageType
}) => {
  await (0, _generateComponent.generateComponent)({
    skipCheck: true,
    templatesPath,
    name: pageName,
    path: pathToPageComponent,
    type: pageType,
    isLogCaptured: false
  });
}).addStep(async ({
  snapshots,
  pathToAppLevelComponentMap,
  pathToAppRoutesFile,
  skipSetup,
  toVersion
}) => {
  if (skipSetup) {
    return;
  }

  await (0, _updatePipelines.applyCodemods)({
    snapshots,
    codemodFileNamePattern: pathToAppLevelComponentMap,
    currentVersion: CURRENT_VERSION,
    toVersion,
    isLogCaptured: false
  });
  await (0, _uiMetadataPipelines.migrateMetadata)({
    isLogCaptured: false,
    snapshots,
    metadataFileNamePattern: pathToAppRoutesFile,
    currentVersion: CURRENT_VERSION,
    toVersion,
    skipVersionMigration: true
  });
});
exports.generatePage = generatePage;
//# sourceMappingURL=generate-page.js.map