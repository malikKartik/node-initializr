const beautify = require("js-beautify").js;
const fs = require("fs");

exports.createAuthMiddleware = (projectPath, jsonData) => {
  const middlewarePath = `${projectPath}/src/middlewares/auth.js`;
  const middlewareContent = `const jwt = require('jsonwebtoken');

  module.exports = (req,res,next)=>{
      try{
          const token = req.body.jwt
          if(token==="" || !token){
              return res.json({message:"User not logged in."})
          }
          const decoded = jwt.verify(token, process.env.JWT_KEY || "key")
          req.userData = decoded
          next()
      }catch(err){
          console.log(err)
          return res.status(401).json({
              message:"Auth failed!"
          })
      }
  }`;

  fs.writeFileSync(middlewarePath, middlewareContent);
};
