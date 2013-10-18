var errors = require("../api/protocol/errorResponseObject.js" );
var mdb = require("../db/mdb.js");

function MDBDataAdapter(collection) {
    this.collection = collection;
}

MDBDataAdapter.prototype = {
    getCollection: function (callback) {
        mdb.getCollection(this.collection, callback);
    }
    , convertToObjectID: function (id) {
        return mdb.convertToObjectID(id);
    }
    , insert: function (doc, callback) {
        
        if (!doc.createdOn) doc.createdOn = new Date();
        if (!doc.lastUpdated) doc.lastUpdated = new Date();

        this.getCollection(function (err, col) {
            if (err)
                callback(err, null);
            else {
                col.insert(doc, function (error, result) {
                    if (error)
                        callback(errors.createInsertError(null, error), null);
                    else
                        callback(null,result)
                });
            }
        })
    }
    , update: function (doc, callback) {
        
        if (!doc.createdOn) doc.createdOn = new Date();
        if (!doc.lastUpdated) doc.lastUpdated = new Date();

        this.getCollection(function (err, col) {
            if (err)
                callback(err, null);
            else {
                col.update({ _id: doc._id }, doc, function (error, result) {
                    if (error)
                        callback(errors.createUpdateError(null, error), null);
                    else
                        callback(null, result)
                });
            }
        })
    }
    , save: function (doc,options, callback) {
        
        if (!callback && typeof (options) == 'function') {
            callback = options;
            options = {};
        }

        if (!doc.createdOn) doc.createdOn = new Date();
        if (!doc.lastUpdated) doc.lastUpdated = new Date();

        this.getCollection(function (err, col) {
            if (err)
                callback(err, null);
            else {
                col.save(doc,options, callback);
            }
        })
    }
    , get: function (id, callback) {
        this.find({ _id: id },null,null,1, callback);
    }
    , find: function (selector, options, callback) {
      
        if (!callback && typeof (options) == 'function') {            
            callback = options;
            options = {};
        }

        if (options == null) options = {};

        this.getCollection(function (err, col) {
            if (err)
                callback(err, null);
            else
                col.find(selector, options).toArray(callback);
        });
      
    }
    
    , remove: function (id, callback) {
        if (!callback) callback = function () { };
        this.getCollection(function (err, col) {
            if (err)
                callback(err, null);
            else
                col.remove({ _id: id }, callback);
        });
    }
    , findAndRemove: function (selector,options, callback) {
        if (!callback) callback = function () { };
        this.getCollection(function (err, col) {
            if (err)
                callback(err, null);
            else
                col.remove(selector, options, callback);
        });
    }
}


module.exports = MDBDataAdapter;