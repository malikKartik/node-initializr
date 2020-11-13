const pluralize = require("pluralize");
const beautify = require("js-beautify").js;
const fs = require("fs");

exports.createModel = (schema, projectPath, jsonData) => {
  const schemaName = pluralize.singular(schema).toLocaleLowerCase();
  const schemaPath = `${projectPath}/src/models/${schemaName}.model.js`;

  //Constants
  const modelName = schemaName.charAt(0).toUpperCase() + schemaName.slice(1);

  // Defining entities for the schema
  let entities = "";
  jsonData.schemas[schema].entities.forEach((entity) => {
    entities =
      entities +
      `${entity.name}:{type: String,required:${entity.required},unique:${entity.unique}},`;
  });
  // File content model
  const fileContent = `const mongoose = require('mongoose')

    const ${schemaName}Schema = mongoose.Schema({
        _id:mongoose.Schema.Types.ObjectId,
        ${entities}
    })

    module.exports = mongoose.model('${modelName}',${schemaName}Schema)`;

  // Writing to the model file
  fs.writeFileSync(
    schemaPath,
    beautify(fileContent, { indent_size: 2, space_in_empty_paren: true })
  );
};
