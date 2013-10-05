
var sessions = require('/auth/userSessions.js');
module.exports = {
    process: function (requestObj, callback) {
        console.log("try to log in... ", requestObj);
        if (requestObj.params.userToken) {
            if (sessions.getSession(requestObj.params.userToken))
                callback(null,{LoggedInSince: new Date() } );
            else
                callback(require('../../../protocol/errorResponseObject.js').createInvalidLoginError(), null);
        }
        else {
            console.log("Invalid UN and PW");
            callback(require('../../../protocol/errorResponseObject.js').createInvalidLoginError(), null);
        }

    }
}