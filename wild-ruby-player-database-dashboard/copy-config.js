var fs = require('fs-extra');
var confFolder = `${process.cwd()}/config/`;

//copy the appropriate file to the statics folder as this json file
if (`${process.argv[2]}` === "dev") {
    fs.copyFileSync(`${confFolder}deploy-config.json`, `${process.cwd()}/src/statics/deploy-config.json`);
} else {
    fs.copyFileSync(`${confFolder}deploy-config-template.json`, `${process.cwd()}/src/statics/deploy-config.json`);
}
