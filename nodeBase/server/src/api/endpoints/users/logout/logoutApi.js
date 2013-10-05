var sessions = require('../../../../lib/sessions.js');

module.exports = {
    process: function (requestObj, callback) {        
        sessions.deleteSession(requestObj.params.token, callback);
    }
}