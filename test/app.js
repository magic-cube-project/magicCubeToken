var server = require("./src/server");
var configs = require("./src/configs.js");
var config = configs.server;
server.start(config);
console.log("The currently started main thread pid " + process.pid);