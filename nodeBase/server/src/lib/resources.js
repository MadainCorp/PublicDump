var resourcesDA = require("../da/resourcesDA.js");


function Resources() {
}

Resources.prototype = {
    add: function (resourceDoc, callback) {
        
        ///just in case
        resourceDoc._id = null
        resourceDoc.email = resourceDoc.email.toLowerCase();

        resourcesDA.dataAdaptor.find({ email: resourceDoc.email}, { limit: 1 }, function (err, results) {

            if (err || results == null) {
                callback(require('../api/protocol/errorResponseObject.js').createCantConnectToDBError(), null);
                return;
            }

            if (results.length == 0) 
                resourcesDA.dataAdaptor.insert(resourceDoc, callback);            
            else
                callback(require('../api/protocol/errorResponseObject.js').createEmailAlreadyInUseError(), null);
            
        });
    }
    , find: function (selector, callback) {
        resourcesDA.dataAdaptor.find(selector, callback);
    }
    ,contains: function (email, callback) {
        
        ///just in case
    
    resourcesDA.dataAdaptor.find({ email: email}, { limit: 1 }, function (err, results) {

        if (err || results == null) {
            callback(require('../api/protocol/errorResponseObject.js').createCantConnectToDBError(), null);
            return;
        }
        
        callback(null,results.length > 0);
            
    });
}
   
}

module.exports = new Resources();