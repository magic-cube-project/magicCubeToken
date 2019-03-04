/**
 * Created by szc on 2018/11/2.
 */

var http = Http;
// url 匹配
var UrlMatch = /http[s]?:\/\/(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\(\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+/;

let modules = {
  name: 'http',
  // get方法
  get: function (path, data) {
    var root = "";
    return new Promise(function (resolve, reject) {
      http.get({
        root: root,
        path: path,
        data: data || {},
        headOparetion: {
          'user-token': localStorage.getItem('user-token') || null
        },
        // withCredentials: true,
        sucFn: function (data) {
          data = data.replace(/[\r\t\n]/g, '');
          var json = JSON.parse(data);
          if (json.error == null) {
            resolve(json);
          } else {
            reject(json);
            app.toast.show(json.error.message);
            console.log(path,json.error.message);
          }
        },
        errFn: function () {
          app.toast.show('网络错误');
          reject();
        }
      });
    });
  },
  // post方法
  post: function (path, data) {
    root = "";
    return new Promise(function (resolve, reject) {
      http.post({
        root: root,
        path: path,
        data: data || {},
        headOparetion: {
          'user-token': localStorage.getItem('user-token') || null,
        },
        withCredentials: true,
        sucFn: function (data) {
          var json = JSON.parse(data);
          if (json.error == null) {
            resolve(json);
          } else {
            reject(json);
            if(json.error.code==-10015){
              app.user.removeSession();
            } else{
              app.toast.show(json.error.message);
              console.log(json.error.code);
            }
          }
        },
        errFn: function () {
          //app.toast.show('网络错误');
          reject();
        }
      });
    });
  },
  // post方法
  form: function (path, data) {
    var root = app.config_net.server_url;
    if (UrlMatch.test(path)) {
      root = "";
    }
    return new Promise(function (resolve, reject) {
      http.form({
        root: root,
        path: path,
        data: data || {},
        headOparetion: {
          'user-token': localStorage.getItem('user-token') || null,
        },
        withCredentials: true,
        sucFn: function (data) {
          var json = JSON.parse(data);
          if (json.error == null) {
            resolve(json);
          } else {
            reject(json);
            app.toast.show(json.error.message);
            console.log(json.error.message);
          }
        },
        errFn: function () {
          app.toast.show('网络错误');
          reject();
        }
      });
    });
  },
  // json 方法
  json: function (path, data) {
    var root = app.config_net.server_url;
    if (UrlMatch.test(path)) {
      root = "";
    }
    return new Promise(function (resolve, reject) {
      http.json({
        root: root,
        path: path,
        data: {
          params: data,
          id: new Date().getTime()
        } || {},
        headOparetion: {
          'user-token': localStorage.getItem('user-token') || null,
        },
        withCredentials: true,
        sucFn: function (data) {
          var json = JSON.parse(data);
          if (json.error == null) {
            resolve(json);
          } else {
            reject(json);
            app.toast.show(json.error.message);
          }
        },
        errFn: function () {
          app.toast.show('网络错误');
          reject();
        }
      });
    });
  }
};

app.model(modules);
