const pluralize = require("pluralize");
const beautify = require("js-beautify").js;
const fs = require("fs");

exports.createRoute = (schema, projectPath, jsonData) => {
  const schemaName = pluralize.singular(schema).toLocaleLowerCase();
  const routePath = `${projectPath}/src/routes/${schemaName}.routes.js`;

  //Constants
  const modelName = schemaName.charAt(0).toUpperCase() + schemaName.slice(1);
  const controllerName = `${schemaName}Controller`;

  // Routes
  let routes = "";
  if (jsonData.schemas.Users && jsonData.schemas.Users.auth) {
    routes = routes + `router.post('/login', ${controllerName}.login);`;
  }

  //File content routes
  const routeFileContent = `const express = require("express");
  const router = express.Router();
  const ${controllerName} = require("../controllers/${schemaName}.controllers.js");

  router.get("/", ${controllerName}.getAll${
    schema.charAt(0).toUpperCase() + schema.slice(1)
  });
  router.get('/:id', ${controllerName}.get${modelName}ById);
  router.post("/", ${controllerName}.create${modelName});
  router.delete("/:id",  ${controllerName}.delete${modelName}ById);
  router.patch("/:id", ${controllerName}.update${modelName});
  ${routes}

module.exports = router;`;

  fs.writeFileSync(
    routePath,
    beautify(routeFileContent, {
      indent_size: 2,
      space_in_empty_paren: true,
    })
  );
};
