var projectsDA = require("../da/projectsDA.js");


function Projects() {
}

Projects.prototype = {
    add: function (projectDoc, callback) {
        ///just in case
        projectDoc._id = null        
        projectsDA.dataAdaptor.insert(projectDoc, callback);        
        
    }
    , find: function (selector, callback) {
        projectsDA.dataAdaptor.find(selector, callback);
    }
    , get: function (id, callback) {        
        this.find({ _id: projectsDA.dataAdaptor.convertToObjectID(id) }, callback);
    }
    , contains: function (projectName, callback) {

        ///just in case

        projectsDA.dataAdaptor.find({ name: projectName }, { limit: 1 }, function (err, results) {

            if (err || results == null) {
                callback(require('../api/protocol/errorResponseObject.js').createCantConnectToDBError(), null);
                return;
            }

            callback(null, results.length > 0);

        });
    }

}

module.exports = new Projects();