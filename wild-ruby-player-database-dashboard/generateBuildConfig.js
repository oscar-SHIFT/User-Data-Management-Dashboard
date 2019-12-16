var fs = require('fs-extra');

var outputFile = "src/statics/build-config.json";
var vMajor = '1';
var vMinor = '0';

var confObj = {}
confObj.version = process.env.GO_PIPELINE_COUNTER ? `v${vMajor}.${vMinor}.${process.env.GO_PIPELINE_COUNTER}` : `v${vMajor}.${vMinor}.local`;

fs.outputJsonSync(outputFile, confObj);