var config = require("../../configs/serverConfigs.js");
var logger = require("../logger.js");
var MongoClient = require('mongodb').MongoClient;

module.exports = {
    getCollection: function (collection,callback) {
        MongoClient.connect(config.mongoDBServer.connectionString,
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
}