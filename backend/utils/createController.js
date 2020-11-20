const pluralize = require("pluralize");
const beautify = require("js-beautify").js;
const fs = require("fs");

exports.createController = (schema, projectPath, jsonData) => {
  const schemaName = pluralize.singular(schema).toLocaleLowerCase();
  const controllerPath = `${projectPath}/src/controllers/${schemaName}.controllers.js`;
  //Constants
  const modelName = schemaName.charAt(0).toUpperCase() + schemaName.slice(1);
  let imports = "";
  let theCreateController = `exports.create${modelName} = (req, res, next) =>{
    const ${schemaName} = new ${modelName}({
      _id: mongoose.Types.ObjectId(),
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

  // IMPORTS
  if (
    jsonData.schemas.Users &&
    jsonData.schemas.Users.auth &&
    schemaName === "user"
  ) {
    imports =
      imports +
      `const bcrypt = require("bcrypt");
  const jwt = require("jsonwebtoken");`;

    // SIGNUP, LOGIN AND LOGOUT CONTROLLERS
    theCreateController = `exports.create${modelName} = (req, res, next) =>{
  ${modelName}.find({ email: req.body.email }).then((data) => {
    if (data.length >= 1) {
      return res.status(409).json({
        message: "User exists!",
      });
    } else {
      bcrypt.hash(req.body.password, 8, async (err, hash) => {
        if (err) {
          return res.status(500).json({
            error: err,
          });
        } else {
          const ${schemaName} = new ${modelName}({
            _id: mongoose.Types.ObjectId(),
            ...req.body,
            password: hash,
          })
          ${schemaName}.save()
          .then((data)=>{
            res.status(200).json(data);
          })
          .catch((err)=>{
            res.status(500).json(err);
          })
        }
      })
    }
  }).catch(err => {
    console.log(err);
    res.status(500).send({
      error: err
    })
  }) 
  }
  
  exports.login = (req, res, next) =>{
    User.find({
      $or: [
        { email: req.body.email },
      ],
    })
    .then(user=>{
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed!",
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id,
            },
            process.env.JWT_SECRET || "key"
          );
          res.cookie("jwt", token, {
            httpOnly: true,
          });
          let responseUser = {...user[0]._doc,token:token}
          delete responseUser["password"]
          return res.send(responseUser)
        }
        return res.status(401).json({
          message: "Auth failed!",
        });
      })
    }).catch((e) => {
      console.log(e);
      res.status(500).json({
        error: "something went wrong!",
      });
    });
  }`;
  }

  //File content controllers
  const controllerFileContent = `${imports}
  const mongoose = require('mongoose')
  
  const ${modelName} = require('../models/${schemaName}.model.js')
  
  exports.getAll${
    schema.charAt(0).toUpperCase() + schema.slice(1)
  } = (req, res, next) =>{
    ${modelName}.find()
    .then((data)=>{
      res.status(200).json(data);
    })
    .catch((err)=>{
      res.status(500).json(err);
    })
  }
  
  ${theCreateController}
  
  exports.get${modelName}ById = (req, res, next) =>{
    ${modelName}.findById(req.params.id)
    .then((data)=>{
      res.status(200).json(data);
    })
    .catch((err)=>{
      res.status(500).json(err);
    })
  }

  exports.delete${modelName}ById = (req, res, next) =>{
    ${modelName}.remove({_id: req.params.id})
    .then((data)=>{
      res.status(200).json(data);
    })
    .catch((err)=>{
      res.status(500).json(err);
    })
  }

  exports.update${modelName} = (req,res,next) =>{
    ${modelName}.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    }).then((data)=>{
      res.status(200).json(data);
    })
    .catch((err)=>{
      res.status(500).json(err);
    })
  }
  `;

  //

  // Writing to the controller file
  fs.writeFileSync(
    controllerPath,
    beautify(controllerFileContent, {
      indent_size: 2,
      space_in_empty_paren: true,
    })
  );
};
