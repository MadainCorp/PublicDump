
var userStories = require('../../../../../../lib/userStories.js');
module.exports = {
    secureAPI:true
    , process: function (requestObj, callback) {
         
        userStories.find({ $query: { projectID: requestObj.params.projectID, sprintID: null }, $orderby: { index: 1 } }, function (err, res) {
            if (err)
                callback(err, null);
            else
                callback(null,  res );
        });
        

    }
}