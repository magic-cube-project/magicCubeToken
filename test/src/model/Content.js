var mongodb  = require("../libs/mongo");
let dbname = "game";
let collection = "content";
//修改游戏link
module.exports.updateLink = async function(app_id,data,language){
    if(!language){
        language = 'zh'
    }
    let query  = {app_id:app_id,language:language};
    let r = await mongodb.Get(dbname,collection,query,{});
    if(r !=null ){
        await mongodb.Insert(dbname,collection,query);
    }
    let upfield = {"link":data};
    let res = await mongodb.UpdateOne(dbname, collection,query,upfield,{});
    return res;
}

//修改游戏内容
module.exports.updateContent = async function( app_id,data,language){
    if(!language){
        language = "zh"
    }
    let query = {app_id:app_id,language:language}
    let r = await mongodb.Get(dbname,collection,query,{});
    if(r !=null ){
        await mongodb.Insert(dbname,collection,query);
    }
    let upfield = {"content":data};
    let res = await mongodb.UpdateOne(dbname, collection,query,upfield,{});
    return res;
}

module.exports.getContent = async function(app_id,language){
    if(!language){
        language = 'zh'
    }
    let query = {app_id:app_id,language:language}
    let r = await mongodb.Get(dbname,collection,query,{});
     return r;
}

// module.exports.updateGameName = async function(app_id,name){
//     let r = await mongodb.get(dbname,collection,{app_id:app_id});
//     if(r.length<1){
//         await mongodb.insert(dbname,collection,{app_id:app_id});
//     }
//     let res = await mongodb.update(dbname, collection,{app_id:app_id},{$set:{"name":name}});
//     return res;
// }

module.exports.updateGameName = async function(app_id,name,language){
    if(!language){
        language = 'zh'
    }
    let query = {app_id:app_id,language:language}
    let r = await mongodb.Get(dbname,collection,query,{});
    if(r != null){
        await mongodb.Insert(dbname,collection,query);
    }
    let upfield = {"name":data};
    let res = await mongodb.UpdateOne(dbname, collection,query,upfield,{});
    return res;
}

module.exports.updateIconLink = async function(app_id,iconlink,language){
    if(!language){
        language = 'zh'
    }
    let query = {app_id:app_id,language:language}
    let r = await mongodb.Get(dbname,collection,query,{});
    if(r !=null ){
        await mongodb.Insert(dbname,collection,query);
    }
    let upfield = {"iconlink":data};
    let res = await mongodb.UpdateOne(dbname, collection,query,upfield,{});
    return res;
}
