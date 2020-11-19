const beautify = require("js-beautify").js;
const fs = require("fs");

exports.createConfig = (projectPath) => {
  const configPath = `${projectPath}/src/config/mongodb.js`;
  const configContent = `
  const prod = true
  if(prod){
      exports.MONGO_URI = process.env.MONGODB_SRV || ''
  }else{
      exports.MONGO_URI = ''
  }
    `;

  fs.writeFileSync(
    configPath,
    beautify(configContent, {
      indent_size: 2,
      space_in_empty_paren: true,
    })
  );
};
