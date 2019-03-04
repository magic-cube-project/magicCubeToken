/**
 * 正确信息处理
 */
module.exports.ok = async function (data) {
    var err = {};
    err.result = null;
    err.error = null;
    if (data)
        err.result = data;
    return err;
}

/**
 * 错误信息处理
 */
module.exports.error = async function (code, message) {
    var err = {};
    err.result = null;
    err.error = {
        code,
        message
    };
    return err;
}
