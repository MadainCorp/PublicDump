var users = require("../../../../lib/users.js");


module.exports = {
    process: function (requestObj, callback) {        
        users.register(requestObj.params, callback);
    }
}