
var userStories = require('../../../../../../lib/userStories.js');
module.exports = {
    secureAPI:true
    ,process: function (requestObj, callback) {    
        userStories.insert(requestObj.params, function (err, res) {
            if (err)
                callback(err, null);
            else
                callback(null,  res );
        });
        

    }
}