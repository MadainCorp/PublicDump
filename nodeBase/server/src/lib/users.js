var userDA = require("../da/usersDA.js");
var crypto = require("crypto");


function Users() {
    
}

Users.prototype = {
    register: function (userDoc, callback) {
        
        ///just in case
        userDoc._id = null;
        userDoc.email = userDoc.email.toLowerCase();
        userDoc.isActive = true;

        try {
            var sha256 = crypto.createHash("sha256");
            sha256.update(userDoc.password, "utf8");
            userDoc.password = sha256.digest("base64");
        }
        catch (e) {
            debugger;
        }
        userDA.dataAdaptor.find({ email: userDoc.email }, { limit: 1 }, function (err, results) {
           
            if (err || results == null) {
                callback(require('../api/protocol/errorResponseObject.js').createCantConnectToDBError(), null);
                return;
            }
           
            if (results.length == 0) {
                /// add new user
                userDA.dataAdaptor.insert(userDoc, callback);                
            }
            else {
                if (userDoc.password == results[0].password) {
                    results[0].name = userDoc.name;
                    userDA.dataAdaptor.update(results[0],callback);                    
                }
                else
                    callback(require('../api/protocol/errorResponseObject.js').createEmailAlreadyInUseError(), null);
            }
        });
    }
    , login: function (email, password, callback) {
        email = email.toLowerCase();
        try{
            var sha256 = crypto.createHash("sha256");
            sha256.update(password, "utf8");
            password = sha256.digest("base64");
        }
        catch (e) {
            debugger;
        }
        //, "password": password
        userDA.dataAdaptor.find({ "email": email }, { limit: 2 }, function (err, results) {
            
            if (results && results.length == 1) {
                callback(null, results[0]);
                console.log(results[0].name + " has logged in.");
            }
            else                 
                callback(require('../api/protocol/errorResponseObject.js').createInvalidLoginError(), null);
        });
        
    }
    ,deactivate: function () {
    }
}

module.exports = new Users();