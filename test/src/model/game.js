var mongodb  = require("../libs/mongo");
var qiniuFile = require("../model/qiniu");


module.exports.insert = async function(dbname, collection, data){
    let res = await mongodb.Insert(dbname, collection, data);
    return res;
}

module.exports.del = async function(dbname, collection, data){
    let res = await mongodb.RemoveOne(dbname, collection, data);
    return res;
}

// //修改标签
// module.exports.updateLabel = async function(dbname, collection, app_id,data){
//     // console.log(111);
//     // console.log(app_id);
//     let res = await mongodb.update(dbname, collection,{app_id:parseInt(app_id)},{$set:{"label":data}});
//     return res;
// }

module.exports.updateLabel = async function(app_id,array,language){
    let dbname = "game";
    let collection = "label";
    if(!language){
        language = 'zh'
    }
    let query = {app_id:app_id,language:language};
    let r = await mongodb.Get(dbname,collection,query,{});
    if(r !=null ){
        let query1 = {app_id:app_id,label:array,language:language}
        let res = await mongodb.Insert(dbname,collection,query1);
    } else{
        let upfield = {"label":array};
        let res = await mongodb.UpdateOne(dbname, collection,query,upfield,{});
    } 
    return 1;
}

module.exports.getLabel = async function(app_id,language){
    let dbname = "game";
    let collection = "label";
    if(!language){
        language = 'zh'
    }

    let query = {app_id:app_id,language:language};
    let r = await mongodb.Get(dbname,collection,query,{});
    return r;
}



//图片上传青牛云修改链接
module.exports.updateLink = async function(dbname, collection, app_id,data){
    var key = await qiniuFile.updateFile(data);
    let query = {app_id:parseInt(app_id)};
    let upField = {"link":"pls18y74f.bkt.clouddn.com/"+key};
    let res = await mongodb.UpdateOne(dbname, collection,query,upField,{});
    return res;
}

module.exports.getByAppid = async function(dbname, collection,data){
    let query = {app_id:parseInt(data)};
    let res = await mongodb.Get(dbname, collection,query,{});
    return res;

}