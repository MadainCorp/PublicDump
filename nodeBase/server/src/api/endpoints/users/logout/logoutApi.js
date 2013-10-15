var sessions = require('../../../../lib/sessions.js');

module.exports = {
    secureAPI:true
    ,process: function (requestObj, callback) {        
        sessions.deleteSession(requestObj.params.token, callback);
    }
}