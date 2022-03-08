"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTimestampForLogs = void 0;

const getTimestampForLogs = () => {
  const dateObj = new Date();
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth().toString().padStart(2, 0);
  const day = dateObj.getDate().toString().padStart(2, '0');
  const hours = dateObj.getHours().toString().padStart(2, 0);
  const mins = dateObj.getMinutes().toString().padStart(2, 0);
  const seconds = dateObj.getSeconds().toString().padStart(2, 0);
  const date = `${year}-${month}-${day}`;
  const time = `${hours}-${mins}-${seconds}`;
  return `${date}_${time}`;
};

exports.getTimestampForLogs = getTimestampForLogs;
//# sourceMappingURL=getTimestampForLogs.js.map