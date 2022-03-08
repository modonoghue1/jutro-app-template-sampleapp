"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.traverseAndExtracti18nMessageIds = traverseAndExtracti18nMessageIds;

function traverseAndExtracti18nMessageIds(obj) {
  let ids = [];

  for (const prop in obj) {
    if (typeof obj[prop] === 'object' && obj[prop]) {
      if (obj[prop].id && obj[prop].defaultMessage) {
        ids.push({
          id: obj[prop].id,
          defaultMessage: obj[prop].defaultMessage,
          description: obj[prop].description
        });
      }

      ids = ids.concat(traverseAndExtracti18nMessageIds(obj[prop]));
    }
  }

  return ids;
}
//# sourceMappingURL=traverseAndExtracti18nMessageIds.js.map