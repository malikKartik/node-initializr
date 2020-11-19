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
  let imports = `const express = require("express");
  const router = express.Router();
  const ${controllerName} = require("../controllers/${schemaName}.controllers.js");`;
  let routers = "";
  if (jsonData.schemas.Users && jsonData.schemas.Users.auth) {
    if (schemaName === "user")
      routes = routes + `router.post('/login', ${controllerName}.login);`;
    imports = imports + `const auth = require("../middlewares/auth.js")`;
  }

  //Read
  if (
    jsonData.schemas[schema].routes.read.protected &&
    jsonData.schemas.Users &&
    jsonData.schemas.Users.auth
  )
    routers =
      routers +
      `router.get("/", auth, ${controllerName}.getAll${
        schema.charAt(0).toUpperCase() + schema.slice(1)
      });`;
  else
    routers =
      routers +
      `router.get("/", ${controllerName}.getAll${
        schema.charAt(0).toUpperCase() + schema.slice(1)
      });`;

  //ReadById
  if (
    jsonData.schemas[schema].routes.readById.protected &&
    jsonData.schemas.Users &&
    jsonData.schemas.Users.auth
  )
    routers =
      routers +
      `router.get('/:id', auth, ${controllerName}.get${modelName}ById);`;
  else
    routers =
      routers + `router.get('/:id', ${controllerName}.get${modelName}ById);`;

  //Create
  if (
    jsonData.schemas[schema].routes.create.protected &&
    jsonData.schemas.Users &&
    jsonData.schemas.Users.auth
  )
    routers =
      routers + `router.post("/", auth, ${controllerName}.create${modelName});`;
  else
    routers =
      routers + `router.post("/", ${controllerName}.create${modelName});`;

  //Delete
  if (
    jsonData.schemas[schema].routes.delete.protected &&
    jsonData.schemas.Users &&
    jsonData.schemas.Users.auth
  )
    routers =
      routers +
      `router.delete("/:id",  auth, ${controllerName}.delete${modelName}ById);`;
  else
    routers =
      routers +
      `router.delete("/:id",  ${controllerName}.delete${modelName}ById);`;

  //Update
  if (
    jsonData.schemas[schema].routes.update.protected &&
    jsonData.schemas.Users &&
    jsonData.schemas.Users.auth
  )
    routers =
      routers +
      `router.patch("/:id", auth, ${controllerName}.update${modelName});`;
  else
    routers =
      routers + `router.patch("/:id", ${controllerName}.update${modelName});`;

  //File content routes
  const routeFileContent = `${imports}
  
  ${routers}
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
