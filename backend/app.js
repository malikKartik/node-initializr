// NOTE: Esprima can be used for JS validation

// ADDING A PACKAGE TO "package.json"
// const fs = require('fs');

// let jsonData = JSON.parse(fs.readFileSync('./package.json'))
// jsonData.dependencies = {
//     "express": "^4.17.1"
//   }

// jsonData = JSON.stringify(jsonData,null,4)
// fs.writeFileSync('package.json', jsonData);

// CREATING DIRECTORIES
// var fs = require('fs');
// let jsonData = JSON.parse(fs.readFileSync('./ninit.config.json'))

// const mkdirs = (obj,path) =>{
//     if(obj){
//         Object.keys(obj).forEach(key=>{
//             let tempPath = path+`/${key}`
//             if(key.split(".").length==1){
//                 if (!fs.existsSync(tempPath)){
//                     fs.mkdirSync(tempPath);
//                 }
//                 mkdirs(obj[key],tempPath)
//             }else{
//                 const filePath = key.split(".")
//                 if(filePath[filePath.length-1]=="js"){
//                     fs.writeFileSync(tempPath);
//                 }
//             }
//         })
//     }
//     return
// }
// mkdirs(jsonData,".")

// CREATING model
const jsonData = {
  structure: {
    src: {
      controllers: {},
      config: {},
      middlewares: {},
      models: {},
      routes: {},
    },
  },
  "server.js": null,
  schemas: {
    Users: {
      name: "Users",
      entities: [
        {
          name: "username",
          required: true,
          unique: false,
        },
        {
          name: "email",
          required: true,
          unique: true,
        },
      ],
    },
    Blogs: {
      name: "Blogs",
      entities: [
        {
          name: "title",
          required: true,
          unique: true,
        },
        {
          name: "content",
          required: true,
          unique: false,
        },
      ],
    },
  },
  languge: "node",
  framework: "express",
};
