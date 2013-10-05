
var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://scrumishuser:$crum1$sh!321@ds063297.mongolab.com:63297/madaincorp',
    function (err, db) {

        if (err)
            debugger;
        else {

            db.collection('userAccounts', function (err, collection) {                
                collection.find(null, null, {limit:2}).toArray(function (err, results) {
                    debugger;
                    results.forEach(function (record) {
                        console.log(JSON.stringify(record));
                        debugger;
                    });
                });
            });


        }
        //db.close();
    });

