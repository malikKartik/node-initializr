const fs = require("fs");

exports.createDotenv = (projectPath, jsonData) => {
  const dotenvPath = `${projectPath}/.env`;
  const dotenvContent = `PORT=${jsonData.env.PORT}
MONGODB_SRV=${jsonData.env.MONGODB_SRV}
JWT_SECRET=${jsonData.env.JWT_SECRET}`;

  fs.writeFileSync(dotenvPath, dotenvContent);
};
