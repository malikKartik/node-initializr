const pluralize = require("pluralize");
const beautify = require("js-beautify").js;
const fs = require("fs");

exports.createController = (schema, projectPath, jsonData) => {
  const schemaName = pluralize.singular(schema).toLocaleLowerCase();
  const controllerPath = `${projectPath}/src/controllers/${schemaName}.controllers.js`;
  //Constants
  const modelName = schemaName.charAt(0).toUpperCase() + schemaName.slice(1);
  //File content controllers
  const controllerFileContent = `const mongoose = require('mongoose')
  
  const ${modelName} = require('../models/${schemaName}.model.js')
  
  exports.getAll${
    schema.charAt(0).toUpperCase() + schema.substring(1)
  } = (req, res, next) =>{
    ${modelName}.find()
    .then((data)=>{
      res.status(200).json(data);
    })
    .catch((err)=>{
      res.status(500).json(err);
    })
  }
  
  exports.create${modelName} = (req, res, next) =>{
    const ${schemaName} = new ${modelName}({
      ...req.body
    })
    ${schemaName}.save()
    .then((data)=>{
      res.status(200).json(data);
    })
    .catch((err)=>{
      res.status(500).json(err);
    })
  }`;

  // Writing to the controller file
  fs.writeFileSync(
    controllerPath,
    beautify(controllerFileContent, {
      indent_size: 2,
      space_in_empty_paren: true,
    })
  );
};
