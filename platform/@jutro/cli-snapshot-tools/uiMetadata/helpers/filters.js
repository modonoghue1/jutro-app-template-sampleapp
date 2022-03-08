"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createFilter = createFilter;
exports.createDataTypeFilter = createDataTypeFilter;
exports.createFieldFilter = createFieldFilter;
exports.createContainerFilter = createContainerFilter;
exports.createElementFilter = createElementFilter;
exports.createActionFilter = createActionFilter;
exports.createLayoutFilter = void 0;

function createFieldFilter(component, additionalFilterFn) {
  const type = 'field';
  return createFilter({
    type,
    component
  }, additionalFilterFn);
}

function createContainerFilter(component, additionalFilterFn) {
  const type = 'container';
  return createFilter({
    type,
    component
  }, additionalFilterFn);
}

function createElementFilter(component, additionalFilterFn) {
  const type = 'element';
  return createFilter({
    type,
    component
  }, additionalFilterFn);
}

function createActionFilter(component, additionalFilterFn) {
  const type = 'action';
  return createFilter({
    type,
    component
  }, additionalFilterFn);
}

function createDataTypeFilter(datatype, additionalFilterFn) {
  const type = 'field';
  return createFilter({
    type,
    datatype
  }, additionalFilterFn);
}

const createLayoutFilter = component => metadata => {
  const componentChecker = componentFilter(metadata, component);
  return componentChecker;
};

exports.createLayoutFilter = createLayoutFilter;

const makeFilter = property => (metadata, propertyToFilter = '*') => {
  if (!metadata[property]) {
    return false;
  }

  if (propertyToFilter === '*') {
    return true;
  }

  return metadata[property].toLowerCase() === propertyToFilter.toLowerCase();
};

const componentFilter = makeFilter('component');
const dataTypeFilter = makeFilter('datatype');

function createFilter({
  type,
  component,
  datatype
}, additionalFilterFn) {
  return metadata => {
    const metadataTypeChecker = metadata.type && metadata.type === type;
    const componentChecker = componentFilter(metadata, component);
    const dataTypeChecker = dataTypeFilter(metadata, datatype);
    const additionalFilterCheck = additionalFilterFn ? additionalFilterFn(metadata) : true;
    return metadataTypeChecker && (componentChecker || dataTypeChecker) && additionalFilterCheck;
  };
}
//# sourceMappingURL=filters.js.map