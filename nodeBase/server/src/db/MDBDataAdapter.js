var mdb = require("../db/mdb.js");

function MDBDataAdapter(collection) {
    this.collection = collection;
}

MDBDataAdapter.prototype = {
    _getCollection: function (callback) {
        mdb.getCollection(this.collection, callback);
    }
    , insert: function (doc, callback) {
        
        if (!doc.createdOn) doc.createdOn = new Date();
        if (!doc.lastUpdated) doc.lastUpdated = new Date();

        this._getCollection(function (err, col) {
            if (err)
                callback(err, null);
            else {
                col.insert(doc, callback);
            }
        })
    }
    , update: function (doc, callback) {
        
        if (!doc.createdOn) doc.createdOn = new Date();
        if (!doc.lastUpdated) doc.lastUpdated = new Date();

        this._getCollection(function (err, col) {
            if (err)
                callback(err, null);
            else {
                col.update(doc, callback);                
            }
        })
    }
    , save: function (doc, callback) {
        
        if (!doc.createdOn) doc.createdOn = new Date();
        if (!doc.lastUpdated) doc.lastUpdated = new Date();

        this._getCollection(function (err, col) {
            if (err)
                callback(err, null);
            else {
                col.save(doc, callback);
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

        this._getCollection(function (err, col) {
            if (err)
                callback(err, null);
            else
                col.find(selector, options).toArray(callback);
        });
      
    }
    
    , remove: function (id, callback) {
        if (!callback) callback = function () { };
        this._getCollection(function (err, col) {
            if (err)
                callback(err, null);
            else
                col.remove({ _id: id }, callback);
        });
    }
}


module.exports = MDBDataAdapter;