(function(){
    'use strict';

    var balances = [];

    app.model({
        name:"web3",
        balanceOf:function(address){
            if(!address) address = undefined;
             return app.http.post("/web3/balanceOf",{}).then(res=>{
                 balances = res.result;
                 return Promise.resolve(res.result);
             })
        },
        getAccount:function(){
            return balances;
        },
        transfer:function(transfer_address,target_address,amount){
              return app.http.post("/web3/transfer",{target_address,transfer_address,amount}).then(res=>{
                   app.toast.show("transfer successfully");
              });
        }
    });
}());