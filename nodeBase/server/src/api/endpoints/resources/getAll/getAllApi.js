
var resources = require('../../../../lib/resources.js');
module.exports = {
    secureAPI: true
    , process: function (requestObj, callback) {
        
        resources.find({},callback);
        
    }
}