#! /usr/bin/env node
"use strict";

var runIgnite = require('@gtui/ignite');

var igniteArgs = process.argv.splice(2);
runIgnite(igniteArgs);