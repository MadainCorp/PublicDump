var users = require("../../../../lib/users.js" );
var sessions = require('../../../../lib/sessions.js');

module.exports = {
    process: function (requestObj, callback) {        
        users.login(requestObj.params.username, requestObj.params.password, function (err, userDoc) {            
            if (err)
                callback(err, null);
            else {
                var token = (new Buffer(new Date().getTime() + "®" + requestObj.params.username).toString('base64'));                
                sessions.setSession(token, { email: userDoc._id, name: userDoc.name}, callback);
            }
        });
        
    }
}