
var sessions = require('../../../../lib/sessions.js');
module.exports = {
    process: function (requestObj, callback) {
        console.log("verify unique email... ", requestObj);
 
        if (requestObj.params.email)             
            sessions.contains(requestObj.params.userToken, function (err, res) {                
                if (err)
                    callback(err, null);
                else
                    callback(null, { LoggedIn: res });
            });
        else {
            console.log("Invalid UN and PW");
            callback(require('../../../protocol/errorResponseObject.js').createInvalidLoginError(), null);
        }

    }
}