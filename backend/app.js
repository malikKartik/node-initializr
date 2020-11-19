const express = require("express");
const path = require("path");
const archiver = require("archiver");
const crypto = require("crypto");

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "newProject")));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Set-Cookie,Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Credentials", true);
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,DELETE,GET");
    return res.status(200).json({});
  }
  next();
});

app.post("/ninit", (req, res) => {
  console.log("Here");
  const jsonData = req.body;
  const fs = require("fs");
  const uuid = require("uuid");
  const PID = uuid.v4();
  const mkdirs = (obj, path) => {
    if (obj) {
      Object.keys(obj).forEach((key) => {
        let tempPath = path + `/${key}`;
        if (key.split(".").length == 1) {
          if (!fs.existsSync(tempPath)) {
            fs.mkdirSync(tempPath);
          }
          mkdirs(obj[key], tempPath);
        } else {
          const filePath = key.split(".");
          if (filePath[filePath.length - 1] == "js") {
            fs.writeFileSync(tempPath);
          }
          if (filePath[filePath.length - 1] == "json") {
            fs.writeFileSync(tempPath);
          }
        }
      });
    }
    return;
  };

  const projectPath = `./newProject/${PID}`;
  if (!fs.existsSync(projectPath)) {
    fs.mkdirSync(projectPath);
  }
  mkdirs(jsonData.structure, projectPath);

  const createModel = require("./utils/createModel").createModel;
  const createController = require("./utils/createController").createController;
  const createRoute = require("./utils/createRoute").createRoute;
  const createApp = require("./utils/createApp").createApp;
  const createServer = require("./utils/createServer").createServer;
  const createConfig = require("./utils/createConfig").createConfig;
  const createPackage = require("./utils/createPackage").createPackage;
  const createMiddleWare = require("./utils/createMiddleware");
  const createDotenv = require("./utils/createDotenv").createDotenv;

  // CREATING ALL FILES(as of now just model file)
  Object.keys(jsonData.schemas).forEach((schema) => {
    createModel(schema, projectPath, jsonData);
    createController(schema, projectPath, jsonData);
    createRoute(schema, projectPath, jsonData);
  });

  createApp(projectPath, jsonData);
  createServer(projectPath);
  createConfig(projectPath);
  createPackage(projectPath, jsonData);
  createDotenv(projectPath, jsonData);
  if (jsonData.schemas.Users && jsonData.schemas.Users.auth)
    createMiddleWare.createAuthMiddleware(projectPath, jsonData);
  const dirPath = __dirname + `/${PID}`;

  const output = fs.createWriteStream(__dirname + `/newProject/${PID}.zip`);
  const archive = archiver("zip", {
    zlib: { level: 9 }, // Sets the compression level.
  });
  output.on("close", function () {
    const algorithm = "aes256";
    const key = "password";
    const text = JSON.stringify(jsonData, null, 4);
    const cipher = crypto.createCipher(algorithm, key);
    const encrypted = cipher.update(text, "utf8", "hex") + cipher.final("hex");
    res.send({ path: `${PID}`, pkey: encrypted });
  });
  archive.pipe(output);
  archive.directory(__dirname + `/newProject/${PID}`, false);
  archive.finalize();
});

module.exports = app;
