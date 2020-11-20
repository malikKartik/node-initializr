const beautify = require("js-beautify").js;
const fs = require("fs");

exports.createPackage = (projectPath, jsonData) => {
  const packagePath = `${projectPath}/package.json`;
  let packages = "";
  jsonData.packages.map((npmPackage, index) => {
    if (index !== jsonData.packages.length - 1) {
      packages =
        packages +
        `"${npmPackage}":"",
      `;
    } else {
      packages = packages + `"${npmPackage}":""`;
    }
  });
  const packageContent = `{
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
    "dotenv":"",
    ${packages}
  }
}`;

  fs.writeFileSync(packagePath, packageContent);
};
