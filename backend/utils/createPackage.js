const beautify = require("js-beautify").js;
const fs = require("fs");

exports.createPackage = (projectPath) => {
  const packagePath = `${projectPath}/package.json`;
  const packageContent = `
  {
    "name": "newproject",
    "version": "1.0.0",
    "description": "",
    "main": "app.js",
    "scripts": {
        "start": "node server.js"
    },
    "author": "",
    "license": "ISC",
    "dependencies": {
        "express": "",
        "mongoose": ""
    }
}
    `;

  fs.writeFileSync(packagePath, packageContent);
};
