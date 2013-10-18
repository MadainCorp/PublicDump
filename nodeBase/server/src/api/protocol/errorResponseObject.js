///////////////////////////////////////////////////////////////
/// All System exceptions should be created here for a centralized error repository
///////////////////////////////////////////////////////////////

function errorData(){    
    this.code= 0;
    this.message = null;
    this.innerError = null;
}

function errorObject() {
    this.id = "";
    this.error = new errorData();
}

/// All System exceptions should be created here for a centralized error repository
errorObject.prototype = {
    createError: function (requestObject, errorCode, errorMessage, innerError) {
        var e = new errorObject();
        if (requestObject != undefined && requestObject != null) {
            e.id = requestObject.id;           
        }

        if (typeof (e.error) == undefined)
            console.log('e.error is undefined');

        e.error.code = errorCode;
        e.error.message = errorMessage;
        e.innerError = innerError;
        return e;
    }
    , createDataPacketTooLargeError: function (requestObject) {
        return this.createError(requestObject, 1000, "Request object too large");
    }
    , createInvalidDataFormatError: function (requestObject) {
        return this.createError(requestObject, 1100, "Invalid Data Format");
    }
    , createInvalidAPIError: function (requestObject) {
        return this.createError(requestObject, 1200, "Invalid API");
    }
    , createInvalidLoginError: function (requestObject) {
        return this.createError(requestObject, 1300, "Invalid Login");
    }
    , createEmailAlreadyInUseError: function (requestObject) {
        return this.createError(requestObject, 1301, "Email is already in use.");
    }
    , createCantConnectToDBError: function (requestObject) {
        return this.createError(requestObject, 1400, "Cant Connect to Data Storage");
    }
    , createAccessDeniedError: function (requestObject) {
        return this.createError(requestObject, 1500, "Access denied");
    }
    , createInsertError: function (requestObject, innerError) {
        if (innerError && innerError.err && innerError.err.toLowerCase().indexOf("duplicate") > 0)
            return this.createError(requestObject, 2000, "Duplicate Insert Error", innerError);
        else
            return this.createError(requestObject, 2000, "Insert Error", innerError);
    }
    , createUpdateError: function (requestObject, innerError) {
        return this.createError(requestObject, 2100, "Update Error", innerError);
    }
}

module.exports = new errorObject();