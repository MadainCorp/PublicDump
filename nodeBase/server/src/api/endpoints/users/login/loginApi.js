var users = require("../../../../lib/users.js" );
var sessions = require('../../../../lib/sessions.js');

module.exports = {
    process: function (requestObj, callback) {        
        users.login(requestObj.params.email, requestObj.params.password, function (err, userDoc) {            
            if (err)
                callback(err, null);
            else {
                sessions.setSession(userDoc, callback);
            }
        });
        
    }
}