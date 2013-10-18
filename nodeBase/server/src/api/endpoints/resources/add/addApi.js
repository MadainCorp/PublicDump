
var resources = require('../../../../lib/resources.js');
module.exports = {
    secureAPI:true
    ,process: function (requestObj, callback) {
        console.log("verify unique email... ", requestObj);
 
        resources.add(requestObj.params, function (err, res) {
            if (err)
                callback(err, null);
            else
                callback(null,  res[0] );
        });
        

    }
}