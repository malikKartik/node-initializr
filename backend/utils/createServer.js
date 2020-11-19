const beautify = require("js-beautify").js;
const fs = require("fs");

exports.createServer = (projectPath) => {
  const serverPath = `${projectPath}/server.js`;
  const serverContent = `
    const http = require('http')
    require('dotenv').config()
const app = require('./app')
const port = process.env.PORT || 3001

const server = http.createServer(app)
server.listen(port)
    `;

  fs.writeFileSync(
    serverPath,
    beautify(serverContent, {
      indent_size: 2,
      space_in_empty_paren: true,
    })
  );
};
