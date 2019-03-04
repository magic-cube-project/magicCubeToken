var server = require("./server");
var configs = require("./configs.js");
var config = configs.server;
server.start(config);
console.log("The currently started main thread pid " + process.pid);