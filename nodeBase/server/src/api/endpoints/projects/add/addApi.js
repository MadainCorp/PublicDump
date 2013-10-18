
var projects = require('../../../../lib/projects.js');
module.exports = {
    secureAPI:true
    ,process: function (requestObj, callback) {
        console.log("verify unique project name... ", requestObj);
 
        projects.add(requestObj.params, function (err, res) {
            if (err)
                callback(err, null);
            else
                callback(null,  res[0] );
        });
        

    }
}