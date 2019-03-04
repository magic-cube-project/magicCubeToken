var mongodb  = require("../libs/mongo");
let dbname = "game";
let collection = "image";
//修改游戏内容
module.exports.addForLink = async function(app_id,link,language){
    if(!language){
        language = 'zh'
    }
    let query = {app_id:app_id,link:link,language:language};
    await mongodb.Insert(dbname,collection,query);
    return 1;
}

module.exports.getImageLink = async function(app_id,language){
    if(!language){
        language = 'zh'
    }
    let query = {app_id:app_id,language:language};
    let r = await mongodb.GetAll(dbname,collection,query,{},{});
     return r;
}