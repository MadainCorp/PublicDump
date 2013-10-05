var httpServer = require('./httpServer.js');
var error = require('./api/protocol/errorResponseObject.js');
var environment = "dev";
var serverConfig = require('../configs/serverConfigs.js').environments[environment];


console.log('*********************************************');
console.log('**************   Start Server   *************');
console.log('*********************************************');


if (true || environment != "dev") {
    console.log('handle uncaughtExceptions');
    ///Handle uncaught Exception and dont let node crash out
    process.on('uncaughtException', function (err) {
        console.error(err);
        console.log(err);
        console.log("ERROR! Try to keep alive. Node recovered...");
    });
}


console.log('Init HTTP server');
httpServer.processRequest = function (httpRequest, httpResponse, method, packet) {
    
    console.log("got a " + method + " req");
    
    if (typeof (packet.data) == undefined
        || (typeof (packet.data) == "string" && packet.data.length == 0)
        ) {
        console.log("nothing to do just leave.");
        httpResponse.end();
        return;
    }
    console.log("\r\r\rdata=" + packet.data);

    var apiManager = require('./api/apiTrafficManager.js');
    var callback = (packet && packet.callback) ? packet.callback : null;
    apiManager.process_request(packet.data, function (err, response) {
        if (err)
            httpServer.writeResult(httpResponse, err, callback ); 
        else
            httpServer.writeResult(httpResponse, response, callback);
    });
}
console.log('start HTTP server');
httpServer.start(serverConfig.ip, serverConfig.httpPort);

console.log('\n\nHTTP Server running at http://' + serverConfig.ip + ':' + serverConfig.httpPort);

