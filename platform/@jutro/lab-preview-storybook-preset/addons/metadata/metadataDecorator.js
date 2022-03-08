"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.metadataDecorator = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/objectWithoutProperties"));

var _debounce = _interopRequireDefault(require("lodash/debounce"));

var _clientLogger = require("@storybook/client-logger");

var _addons = require("@storybook/addons");

var _uimetadata = require("@jutro/uimetadata");

var _constants = require("./constants");

var _serializeReactNodeToMetadata = require("./serializers/serializeReactNodeToMetadata");

function generateMetadata(node) {
  try {
    return (0, _serializeReactNodeToMetadata.serializeReactNodeToMetadata)(node);
  } catch (e) {
    _clientLogger.logger.error(`Error while generating metadata:`, e);

    return 'Unable to generate the metadata';
  }
}

const generateAndEmitMetadataDebounced = (0, _debounce.default)((node, metadata) => {
  emitMetadata(metadata || generateMetadata(node));
}, 300);

function getMetadataData(metadata) {
  const _ = metadata.$schema,
        jutro = metadata.jutro,
        definitions = (0, _objectWithoutProperties2.default)(metadata, ["$schema", "jutro"]);
  return Object.entries(definitions).map(([key, data]) => ({
    title: key,
    metadata: JSON.stringify(data, undefined, 2)
  }));
}

function emitMetadata(metadata) {
  const data = (0, _uimetadata.isMetadataJSON)(metadata) ? getMetadataData(metadata) : [{
    title: 'Metadata',
    metadata: JSON.stringify(metadata, undefined, 2)
  }];

  const channel = _addons.addons.getChannel();

  channel.emit(_constants.EVENTS.GENERATED, data);
}

const metadataDecorator = (0, _addons.makeDecorator)({
  name: 'metadata',
  parameterName: 'metadata',
  wrapper: (storyFn, context) => {
    const args = context.args,
          _context$parameters$m = context.parameters.metadata,
          metadataParams = _context$parameters$m === void 0 ? {} : _context$parameters$m;
    const uiMetadata = metadataParams.uiMetadata,
          _metadataParams$disab = metadataParams.disabled,
          disabled = _metadataParams$disab === void 0 ? false : _metadataParams$disab;
    const uiProps = args.uiProps;
    const story = storyFn(context);

    if (disabled) {
      return story;
    }

    generateAndEmitMetadataDebounced(story, uiMetadata || uiProps);
    return story;
  }
});
exports.metadataDecorator = metadataDecorator;
//# sourceMappingURL=metadataDecorator.js.map