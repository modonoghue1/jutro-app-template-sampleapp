"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = `diff --git a/.babelrc b/.babelrc
index 5bb15f1..e716788 100644
--- a/.babelrc
+++ b/.babelrc
@@ -1,3 +1,3 @@
 {
-  "extends": "./node_modules/@jutro/build-tools/babel-config/.babelrc"
-}
\\ No newline at end of file
+    "extends": "@jutro/build-tools/babel-config/.babelrc"
+}
diff --git a/.env b/.env
index 6add0b2..d25a76a 100644
--- a/.env
+++ b/.env
@@ -2,5 +2,4 @@ REACT_APP_JUTRO_LOGGER_LEVEL=WARN
 SKIP_PREFLIGHT_CHECK=true
 
 # E2E related env vars
-DEPLOY_URL=http://localhost:3000
-
+DEPLOY_URL=http://localhost:3000
\\ No newline at end of file
diff --git a/.env.production b/.env.production
index 3d2cfc0..81de9f7 100644
--- a/.env.production
+++ b/.env.production
@@ -1,2 +1,2 @@
 REACT_APP_JUTRO_LOGGER_LEVEL=ERROR
-SKIP_PREFLIGHT_CHECK=true
\\ No newline at end of file
+SKIP_PREFLIGHT_CHECK=true
diff --git a/.eslintrc.js b/.eslintrc.js
index 1607c79..eda50af 100644
--- a/.eslintrc.js
+++ b/.eslintrc.js
@@ -1,3 +1,3 @@
 module.exports = {
-    extends: ['./node_modules/@jutro/build-tools/eslint-config/index'],
+    extends: [require.resolve('@jutro/build-tools/eslint-config/index')],
 };
diff --git a/.prettierrc.js b/.prettierrc.js
index abd18e4..6043a8d 100644
--- a/.prettierrc.js
+++ b/.prettierrc.js
@@ -1,3 +1,3 @@
 module.exports = {
-    ...require('./node_modules/@jutro/build-tools/prettier-config/index'),
+    ...require('@jutro/build-tools/prettier-config/index'),
 };
diff --git a/.stylelintrc b/.stylelintrc
index 40eefa2..4fe4f22 100644
--- a/.stylelintrc
+++ b/.stylelintrc
@@ -1,3 +1,3 @@
 {
-  "extends": "./node_modules/@jutro/build-tools/stylelint-config/index"
+  "extends": "@jutro/build-tools/stylelint-config/index"
 }
diff --git a/commitlint.config.js b/commitlint.config.js
index 8f0f1f8..ce7f96a 100644
--- a/commitlint.config.js
+++ b/commitlint.config.js
@@ -1,3 +1,3 @@
 module.exports = {
-    extends: ['./node_modules/@jutro/build-tools/commitlint-config/index'],
+    extends: ['@jutro/build-tools/commitlint-config/index'],
 };
diff --git a/html/index.html b/html/index.html
index 6c6b419..e3fd25c 100644
--- a/html/index.html
+++ b/html/index.html
@@ -1,22 +1,17 @@
 <!DOCTYPE html>
 <html>
   <head>
-
-      <link rel="shortcut icon" type="image/png" href="%PUBLIC_URL%/images/guidewire-logo.png" />
       <!--
-      manifest.json provides metadata used when your web app is added to the
-      homescreen on Android. See https://developers.google.com/web/fundamentals/web-app-manifest/
+      The base tags href attribute value will be used to prefix any relative urls in app.
+      For this to work consistently must be set to the same value as the basename for the react router
       -->
-      <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
+      <base href="%PUBLIC_URL%/">
+      <link rel="shortcut icon" type="image/png" href="images/guidewire-logo.png" />
       <!--
-      Notice the use of %PUBLIC_URL% in the tags above.
-      It will be replaced with the URL of the \`public\` folder during the build.
-      Only files inside the \`public\` folder can be referenced from the HTML.
-
-      Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
-      work correctly both with client-side routing and a non-root public URL.
-      Learn how to configure a non-root public URL by running \`npm run build\`.
+      manifest.json provides metadata used when your web app is added to the
+      homescreen on Android. See https://developers.google.com/web/fundamentals/web-app-manifest/
       -->
+      <link rel="manifest" href="manifest.json" />
 
       <meta charSet="utf-8" />
       <meta
diff --git a/tsconfig.app.json b/tsconfig.app.json
index 8f186ad..5ce9f48 100644
--- a/tsconfig.app.json
+++ b/tsconfig.app.json
@@ -1,9 +1,5 @@
 {
-  "include": [
-    "./src/**/*",
-    "./typings.d.ts"
-  ],
-  "exclude": [
-    "node_modules"
-  ]
+  "extends": "../../tsconfig.json",
+  "include": ["./src/**/*", "./typings.d.ts"],
+  "exclude": ["node_modules"]
 }
`;
exports.default = _default;
//# sourceMappingURL=diff.js.map