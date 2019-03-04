var server = require("./server");
var configs = require("./configs.js");
var config = configs.server;
server.start(config);
console.log("当前启动的主线程 pid " + process.pid);