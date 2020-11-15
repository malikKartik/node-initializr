const beautify = require("js-beautify").js;
const fs = require("fs");

exports.createPackage = (projectPath, jsonData) => {
  const packagePath = `${projectPath}/package.json`;
  let packages = "";
  if (jsonData.schemas.Users.auth) {
    packages =
      packages +
      `"bcrypt": "",
    "jsonwebtoken": "",
    `;
  }
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
        ${packages}
        "express": "",
        "mongoose": ""
    }
}
    `;

  fs.writeFileSync(packagePath, packageContent);
};
