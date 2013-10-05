

var useMongo =true;
var mod;
if (useMongo) { // use mongo db for session management
    var sessions = require('../da/sessionsDA.js');
    mod= {
        addSession: function (token, callback) {            
            var doc = new sessions.Document();
            doc._id = token;            
            sessions.dataAdaptor.save(doc, function (err, result) { callback(err, { userToken: token }); });
            
       }
        , getSession: function (token, callback) {
            sessions.dataAdaptor.get(token, callback);
        }
        , contains: function (token, callback) {
            console.log(">>>>>>>search for " + token);            
            sessions.dataAdaptor.find({ "_id": token }, function (err, result) {  callback(null, result.length > 0); });
        }
        , deleteSession: function (token, callback) {
            sessions.dataAdaptor.remove(token, callback);
        }
    }
}
else { // keep in local memeory
    mod = {
        _sessions: {}
        , addSession: function (token, callback) {
            if (callback)
                callback(null, this._sessions[token] = {userToken:token} );
        }
        , getSession: function (token, callback) {
            if (callback)
                callback(null, this._sessions[token] );
        }
        , contains: function (token, callback) {
            if (callback)
                callback(null, this._sessions[token] ? true : false );
        }
        , deleteSession: function (token, callback) {
            delete this._sessions[token];
            if (callback)
                callback(null,  "done" );
        }
    }
}

module.exports = mod;