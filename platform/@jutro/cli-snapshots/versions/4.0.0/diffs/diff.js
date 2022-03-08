"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = `diff --git a/.babelrc b/.babelrc
index 93447ca..5bb15f1 100644
--- a/.babelrc
+++ b/.babelrc
@@ -1,10 +1,3 @@
 {
-  "plugins": [
-    [
-      "react-intl",
-      {
-        "messagesDir": "./i18n/"
-      }
-    ]
-  ]
+  "extends": "./node_modules/@jutro/build-tools/babel-config/.babelrc"
 }
\\ No newline at end of file
diff --git a/.env b/.env
index 4f4dbcf..6add0b2 100644
--- a/.env
+++ b/.env
@@ -1,3 +1,6 @@
 REACT_APP_JUTRO_LOGGER_LEVEL=WARN
+SKIP_PREFLIGHT_CHECK=true
+
+# E2E related env vars
+DEPLOY_URL=http://localhost:3000
 
-REACT_APP_JUTRO_ROUTER_BASENAME=
diff --git a/.env.production b/.env.production
index 8e5d03b..3d2cfc0 100644
--- a/.env.production
+++ b/.env.production
@@ -1 +1,2 @@
 REACT_APP_JUTRO_LOGGER_LEVEL=ERROR
+SKIP_PREFLIGHT_CHECK=true
\\ No newline at end of file
diff --git a/.eslintrc.js b/.eslintrc.js
new file mode 100644
index 0000000..1607c79
--- /dev/null
+++ b/.eslintrc.js
@@ -0,0 +1,3 @@
+module.exports = {
+    extends: ['./node_modules/@jutro/build-tools/eslint-config/index'],
+};
diff --git a/.prettierrc.js b/.prettierrc.js
index bc92652..abd18e4 100644
--- a/.prettierrc.js
+++ b/.prettierrc.js
@@ -1,6 +1,3 @@
 module.exports = {
-    singleQuote: true,
-    trailingComma: 'es5',
-    tabWidth: 4,
-    parser: 'babel'
+    ...require('./node_modules/@jutro/build-tools/prettier-config/index'),
 };
diff --git a/.stylelintrc b/.stylelintrc
index d07f58a..40eefa2 100644
--- a/.stylelintrc
+++ b/.stylelintrc
@@ -1,40 +1,3 @@
 {
-  "extends": "stylelint-config-standard",
-  "plugins": [
-    "stylelint-declaration-use-variable"
-  ],
-  "rules": {
-    "at-rule-no-unknown": null,
-    "selector-pseudo-class-no-unknown": [
-      true,
-      {
-        "ignorePseudoClasses": [
-          "global"
-        ]
-      }
-    ],
-    "selector-type-no-unknown": null,
-    "property-no-unknown": [
-      true,
-      {
-        "ignoreProperties": [
-          "composes"
-        ]
-      }
-    ],
-    "sh-waqar/declaration-use-variable": [
-      [
-        "/color/",
-        "font-size",
-        {
-          "ignoreValues": [
-            "transparent",
-            "inherit",
-            "currentColor"
-          ]
-        }
-      ]
-    ],
-    "no-descending-specificity": null
-  }
+  "extends": "./node_modules/@jutro/build-tools/stylelint-config/index"
 }
diff --git a/commitlint.config.js b/commitlint.config.js
new file mode 100644
index 0000000..8f0f1f8
--- /dev/null
+++ b/commitlint.config.js
@@ -0,0 +1,3 @@
+module.exports = {
+    extends: ['./node_modules/@jutro/build-tools/commitlint-config/index'],
+};
diff --git a/html/index.html b/html/index.html
index 3bfb90c..6c6b419 100644
--- a/html/index.html
+++ b/html/index.html
@@ -30,7 +30,7 @@
       You need to enable JavaScript to run this app.
     </noscript>
     <div id="root"></div>
-    <div id="confirmation"></div>
+    <div id="modalRoot"></div>
     <!--
       This HTML file is a template.
       If you open it directly in the browser, you will see an empty page.
diff --git a/lint-staged.config.js b/lint-staged.config.js
index cdef053..25882ed 100644
--- a/lint-staged.config.js
+++ b/lint-staged.config.js
@@ -1,6 +1,7 @@
 module.exports = {
     linters: {
         '*.js': ['npm run prettier-check', 'eslint'],
+        '*.{ts,tsx}': ['npm run prettier-check'],
         '*.scss': ['stylelint'],
     },
 };
diff --git a/tsconfig.app.json b/tsconfig.app.json
index a979861..8f186ad 100644
--- a/tsconfig.app.json
+++ b/tsconfig.app.json
@@ -1,6 +1,7 @@
 {
   "include": [
-    "./src/**/*"
+    "./src/**/*",
+    "./typings.d.ts"
   ],
   "exclude": [
     "node_modules"
diff --git a/typings.d.ts b/typings.d.ts
new file mode 100644
index 0000000..43ca648
--- /dev/null
+++ b/typings.d.ts
@@ -0,0 +1,9 @@
+declare module '*.json5' {
+    const value: any;
+    export default value;
+}
+
+declare module '*.scss' {
+    const content: { [className: string]: string };
+    export default content;
+}
`;
exports.default = _default;
//# sourceMappingURL=diff.js.map