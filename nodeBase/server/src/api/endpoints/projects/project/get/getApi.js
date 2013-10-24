
var projects = require('../../../../../lib/projects.js');
module.exports = {
    secureAPI:true
    ,process: function (requestObj, callback) {    
        projects.get(requestObj.params._id , function (err, res) {
            if (err)
                callback(err, null);
            else
                callback(null,  res );
        });
        

    }
}