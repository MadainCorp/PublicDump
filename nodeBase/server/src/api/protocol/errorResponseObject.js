///////////////////////////////////////////////////////////////
/// All System exceptions should be created here for a centralized error repository
///////////////////////////////////////////////////////////////

function errorData(){    
    this.code= 0;
    this.message= null;
}

function errorObject() {
    this.id = "";
    this.error = new errorData();
}

/// All System exceptions should be created here for a centralized error repository
errorObject.prototype = {
    createError: function (requestObject, errorCode, errorMessage) {
        var e = new errorObject();
        if (requestObject != undefined && requestObject != null) {
            e.id = requestObject.id;           
        }

        if (typeof (e.error) == undefined)
            console.log('e.error is undefined');

        e.error.code = errorCode;
        e.error.message = errorMessage;
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
    , createCantConnectToDB: function (requestObject) {
        return this.createError(requestObject, 1400, "Cant Connect to Data Storage");
    }
}

module.exports = new errorObject();