"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = `diff --git a/typings.d.ts b/typings.d.ts
index 43ca648..a013fba 100644
--- a/typings.d.ts
+++ b/typings.d.ts
@@ -7,3 +7,14 @@ declare module '*.scss' {
     const content: { [className: string]: string };
     export default content;
 }
+
+type Nullable<T> = T | null;
+
+// Now string only but it is actually only list of components in components map
+type ReactComponentMetadata = string;
+// Reusable type to easily replace in metadata in future
+// Find better name?
+/**
+ * @TJS-type string
+ */
+type ReactComponent = ReactComponentMetadata | React.ComponentType;
`;
exports.default = _default;
//# sourceMappingURL=diff.js.map