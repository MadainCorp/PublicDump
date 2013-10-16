

var api = {
    apiTimeout:30000
    ,server: 'http://127.0.0.1:1339'
    ,_fullLogging:false
    , turnLoggingOn: function (value) {
        this._fullLogging = value;
    }
    , call: function (id,method,params,callback,errorCallback) {
        try{
            if (typeof (params) == "string") params = JSON.parse(params);
            
            var currentUser=null;
            if(authManager)
                currentUser= authManager.getCurrentUser();

            var data = {
                id: id
                , method: method
                , params: params
                , userToken: (currentUser ? currentUser.userToken : null)
            };
            
            var tmr = null;
            if (api._fullLogging && console.log)
                console.info("Call: " + JSON.stringify(data));

            var p = $.getJSON(this.server + "?callback=?", { data: JSON.stringify(data) }, function (result) {
                if (tmr) clearTimeout(tmr);

                if ((result.error) && console.log)
                    console.log("Error: " + JSON.stringify(result));
                else if (api._fullLogging)
                    console.log("Result: " + JSON.stringify(result));

                if (callback) callback(result);
            } ,function (e) {
                debugger;
                if (errorCallback)
                    errorCallback(e);
                else if (console.log) {
                    console.log(JSON.stringify( e));
                    callback({  error: { code: -1, message: "Error communicating with the server" } } );
                }
            });

            tmr = setTimeout(function () {                
                if (p) {
                    p.abort();
                    if (errorCallback)
                        errorCallback({ error: { code: 0, message: "timeout" } });
                }
            }, api.apiTimeout)

        }
        catch (e) {
            debugger;
            if (errorCallback)
                errorCallback(e);
            else if (console.log)
                console.log(e.message);
        }

    }
}

api.turnLoggingOn(document.URL.indexOf('localhost') >= 0);
if (console.log) console.log("api loaded");