var config = require("../../configs/serverConfigs.js");
var logger = require("../logger.js");
var mongo = require('mongodb');
//var MongoClient = require('mongodb').MongoClient;
//var MongoObjectID = require('mongodb').ObjectID;

module.exports = {
    getCollection: function (collection,callback) {
        mongo.MongoClient.connect(config.mongoDBServer.connectionString,
            function (err, db) {

                if (err) {
                    console.log('error', "cant connect to mongodb.");
                    logger.log('error', "cant connect to mongodb.");
                    callback(err, null);
                }
                else {
                    
                    callback(null, db.collection(collection));
                }
                ///db.close(); -- auto pools
            });
    }
    , convertToObjectID: function (id) {
        return new mongo.ObjectID.createFromHexString(id);
    }
}