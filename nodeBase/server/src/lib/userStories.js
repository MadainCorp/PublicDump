var errors = require("../api/protocol/errorResponseObject.js");
var userStoriesDA = require("../da/userStoriesDA.js");


function UserStories() {
}

UserStories.prototype = {
    
    find: function (selector, callback) {
        userStoriesDA.dataAdaptor.find(selector, callback);
    }
    , get: function (id, callback) {
        this.find({ _id: userStoriesDA.dataAdaptor.convertToObjectID(id) }, callback);
    }
    , insert: function (userStoryDoc,callback) {
        userStoryDoc._id = null
        userStoryDoc.sprintID = null;
        if (!userStoryDoc.index) userStoryDoc.index = 9999.999;

        if (!userStoryDoc.projectID) {
            callback(errors.createInsertError(), null);
            return;
        }
        
        var projects = require("./../da/projectsDA.js");

        projects.dataAdaptor.findByObjectID(userStoryDoc.projectID , function (err, response) {
            if (err) {
                callback(errors.createInsertError(null, err), null);
                return;
            }

            if (response.length == 0) {
                callback(errors.createInsertError(null, "Invalid Project ID"), null);
                return;
            }
            else {
                userStoriesDA.dataAdaptor.insert(userStoryDoc, function (err, response) {
                    if (err) {
                        callback(errors.createInsertError(null, err), null);
                        return;
                    }

                    callback(null, response);
                });
            }
        });

        
    }
     , update: function (userStoryDoc, callback) {
         
         if (!userStoryDoc._id) {
             callback(errors.createUpdateError(null, "_id not provided"), null);
             return;
         }

         if (!userStoryDoc.projectID) {
             callback(errors.createUpdateError(null,"projectID not provided"), null);
             return;
         }
         userStoryDoc._id = userStoriesDA.dataAdaptor.convertToObjectID(userStoryDoc._id);
        userStoriesDA.dataAdaptor.update(userStoryDoc, function (err, response) {
            if (err) {
                callback(errors.createInsertError(null, err), null);
                return;
            }
            callback(null, response);
        });
         

     }
    , delete: function (userStoryDoc, callback) {

        if (!userStoryDoc._id) {
            callback(errors.createDeleteError(null, "_id not provided"), null);
            return;
        }

        if (!userStoryDoc.projectID) {
            callback(errors.createDeleteError(null, "projectID not provided"), null);
            return;
        }
        userStoryDoc._id = userStoriesDA.dataAdaptor.convertToObjectID(userStoryDoc._id);
        userStoriesDA.dataAdaptor.remove(userStoryDoc._id, function (err, response) {
            if (err) {
                callback(errors.createDeleteError(null, err), null);
                return;
            }
            callback(null, response);
        });


    }
    
}

module.exports = new UserStories();