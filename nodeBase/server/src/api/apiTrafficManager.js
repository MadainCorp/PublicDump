/////////////////////////////////////////////////////////////////////////////
/// used to grab an api request and send it to the correct module
/////////////////////////////////////////////////////////////////////////////
var Validator = require('jsonschema').Validator;
var requestSchema = require('./protocol/requestSchema.js');
var ResponseObject = require('./protocol/responseObject.js');

module.exports = {
    process_request: function (requestPacket, callback) {

        var requestObj;
        ///Pare JSON
        console.log("requestPacket = " + JSON.stringify(requestPacket));
        try {
            requestObj = typeof(requestPacket)=="object"?requestPacket: JSON.parse(requestPacket);
        }
        catch (e) {
            console.log("Invalid JSON!");
            require('../logger.js').log('error', {message:"invalid JSON", "packet": requestPacket });
            callback(require('./protocol/errorResponseObject.js').createInvalidDataFormatError(), null);
            return;
        }


        /// Check if valid request format
        var v = new Validator();
        var e = v.validate(requestObj, requestSchema).errors;
        if (e.length > 0) {
            console.log("Invalid Schema!");

            require('../logger.js').log('error',{ "packet": requestPacket,"schemaErrors":e } );
            callback(require('./protocol/errorResponseObject.js').createInvalidDataFormatError(), null);
            return;
        }

        
        var sections = requestObj.method.split('/');
        sections = sections[sections.length-1].split('\\');
        var prefix = sections[sections.length - 1];
        

        /// Check if correct params
        var paramSchema = require('./endpoints/' + requestObj.method + '/' + prefix + 'ParamSchema.js');
        if (paramSchema) {
            var e = v.validate(requestObj.params, paramSchema).errors;
            if (e.length > 0) {
                console.log("Invalid Params!");

                require('../logger.js').log('error', { "packet": requestPacket, "schemaErrors": e });
                callback(require('./protocol/errorResponseObject.js').createInvalidDataFormatError(), null);
                return;
            }
        }

        ///Call API;
        var api = require('./endpoints/' + requestObj.method +  '/' + prefix + 'Api.js');
        if (api && api.process) {            
            api.process(requestObj, function (err, result) {
                
                if (err) {
                    console.log("error: " + JSON.stringify(err));
                    callback(err, null);
                    return;
                }
                else {
                    console.log("result: " + JSON.stringify(result));
                    var responseObj = new ResponseObject(requestObj.id, result);
                    callback(null, responseObj);                    
                    return;
                }
            });
        }
        else {
            console.log("No Such API!");
            require('../logger.js').log('error', { "packet": requestPacket, "Not an API": e });
            callback(require('./protocol/errorResponseObject.js').createInvalidAPIError(), null);
            return;
        }

    }   
    
}
