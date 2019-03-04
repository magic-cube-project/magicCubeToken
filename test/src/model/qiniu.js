var mongodb = require("../libs/mongo");
var qiniu = require('qiniu');
var accessKey = 'xOY38LXJJ5moC6cSJyh-acBmTmgqgTWD-GBqYJ9e';
var secretKey = 'p3oPdSefHyKnno_PUOxe9zsZr6gHaI2hy5BGjeIG';
var mac = new qiniu.auth.digest.Mac('xOY38LXJJ5moC6cSJyh-acBmTmgqgTWD-GBqYJ9e', 'p3oPdSefHyKnno_PUOxe9zsZr6gHaI2hy5BGjeIG');

var MongoClient = require('mongodb').MongoClient;
var config = require("../configs").mongodb;
var url = "mongodb://" + config.url + ":" + config.port;
var connected = 0;
var db = null;

function _connect() {
  return new Promise(function (resolve, reject) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, _db) {
      if (err) {
        reject(err);
        throw err;
      } else {
        console.log("db is load");
        resolve();
        connected = 1;
        db = _db;
      }
    });
  })
}

// var options = {
//     scope: 'game',
//     expires: 7200
//   };
//   var putPolicy = new qiniu.rs.PutPolicy(options);
//   var uploadToken=putPolicy.uploadToken(mac);

// var keyToOverwrite = 'qiniu.mp4';
// var options = {
//   scope: 'game' + ":" + keyToOverwrite
// }
// var putPolicy = new qiniu.rs.PutPolicy(options);
// var uploadToken=putPolicy.uploadToken(mac);

var saveMp4Entry = qiniu.util.urlsafeBase64Encode('game' + ":avthumb_test_target.mp4");
var saveJpgEntry = qiniu.util.urlsafeBase64Encode('game' + ":vframe_test_target.jpg");
//数据处理指令，支持多个指令
var avthumbMp4Fop = "avthumb/mp4|saveas/" + saveMp4Entry;
var vframeJpgFop = "vframe/jpg/offset/1|saveas/" + saveJpgEntry;
var options = {
  scope: 'game',
  //将多个数据处理指令拼接起来
  persistentOps: avthumbMp4Fop + ";" + vframeJpgFop,
  //数据处理队列名称，必填
  persistentPipeline: "gameFile",
  //数据处理完成结果通知地址
  persistentNotifyUrl: "http://api.example.com/qiniu/pfop/notify",
  //   callbackUrl: 'http://api.example.com/qiniu/upload/callback',
  //   callbackBody: 'key=$(key)&bucket=$(game)'
}
var putPolicy = new qiniu.rs.PutPolicy(options);
var uploadToken = putPolicy.uploadToken(mac);

var config = new qiniu.conf.Config();
// 空间对应的机房
config.zone = qiniu.zone.Zone_z0;

// var localFile = "data";
// var formUploader = new qiniu.form_up.FormUploader(config);
// var putExtra = new qiniu.form_up.PutExtra();
// var key='data';
// // 文件上传

function _updateFile(data) {
  
  var localFile = data;
  var formUploader = new qiniu.form_up.FormUploader(config);
  var putExtra = new qiniu.form_up.PutExtra();
  var key = data;
  
  return new Promise(function(resolve,reject){
    formUploader.putFile(uploadToken, key, localFile, putExtra, function (respErr,
      respBody, respInfo) {
        
      if (respErr) {
        reject(respErr);
      }
      
      if (respInfo.statusCode == 200) {
        console.log(respBody);
        console.log(111);
        res = respBody.key;
        resolve (res);
      } else {
        // console.log(respInfo.statusCode);
        // console.log(respBody);
        // res = respBody.key;
        // resolve (res);
      }
    })  
  }); 
}


exports.updateFile = async function (data) {
  
  if (!connected) {
    
    await _connect();
  }
  let a = await _updateFile(data);
  console.log(a);
  return a;
}

// formUploader.putFile(uploadToken, key, localFile, putExtra) {
//   return new Promise(function (respErr,respBody, respInfo) {
//     if (respErr) {
//       throw respErr;
//     }
//     if (respInfo.statusCode == 200) {
//       console.log(respBody);

//     } else {
//       console.log(respInfo.statusCode);
//       console.log(respBody.key);
//           }
//       });
//   };

