"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lintMessages = void 0;

const lintMessages = messages => messages.reduce((allMessages, {
  id,
  defaultMessage,
  description
}) => {
  const messageIndex = allMessages.findIndex(item => item.id === id);

  if (messageIndex >= 0) {
    console.warn(`The message id: ${id} has been previously defined and has been overwritten`);
    allMessages.splice(messageIndex, 1);
  }

  allMessages.push({
    id,
    defaultMessage,
    description
  });
  return allMessages;
}, []);

exports.lintMessages = lintMessages;
//# sourceMappingURL=lintMessages.js.map