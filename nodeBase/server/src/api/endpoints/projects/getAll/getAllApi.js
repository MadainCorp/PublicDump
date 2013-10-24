
var projects = require('../../../../lib/projects.js');
module.exports = {
    secureAPI: true
    , process: function (requestObj, callback) {
        
        projects.find({}, callback);
        
    }
}