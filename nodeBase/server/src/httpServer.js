var http = require('http');
var url= require('url');
var logger = require('./logger.js');

function httpServer() {
    this.ip = null;
    this.httpPort = null;
    this.server = null;
}


console.log('Create HTTP Server');
module.exports ={
    start:function (ip, httpPort) {
        console.log('Create http Server');
        this.ip = ip;
        this.httpPort = httpPort;
        
        /// create a new HTTP server that handles requests
        var t = this;
        var server = http.createServer(function (httpRequest, httpResponse) { t.handleRequest(httpRequest, httpResponse) });

        logger.log('info', "start server " + ip + ":" + httpPort);

        /// listen to this port on this IP
        server.listen(httpPort, ip);        
    }
    /// handle http httpRequest
    , handleRequest:function (httpRequest, httpResponse) {

        if (httpRequest.method == 'POST')
            this.handlePost(httpRequest, httpResponse);
        else
            this.handleGet(httpRequest, httpResponse);
    }

    , handlePost: function (httpRequest, httpResponse) {
        var packet = '';

        httpRequest.on('data', function (data) {
            console.log("data = " + data);
            packet += data;
            /// 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (packet.length > 1e6) {
                /// FLOOD ATTACK OR FAULTY CLIENT, NUKE httpRequest
                httpRequest.connection.destroy();
            }
        });

        var t=this;
        httpRequest.on('end', function () {
            t.processRequest(httpRequest, httpResponse, 'POST', packet);
        });

    }
    , handleGet: function (httpRequest, httpResponse) {
        var url_parts = url.parse(httpRequest.url, true);        
        this.processRequest(httpRequest, httpResponse, 'GET', url_parts.query);

    }
    , processRequest: function (httpRequest, httpResponse, method, data) {
        throw ('Error! Need to handle httpServer.processRequest');
    }

    , writeResult: function (httpResponse, resultObj,jsonpCallback) {
        httpResponse.writeHead(200, { 'Content-Type': 'application/json'});        
        if (jsonpCallback ) 
            // if the callback parameter is present wrap the JSON
            // into this parameter => convert to JSONP        
            httpResponse.end(jsonpCallback + "(" + JSON.stringify(resultObj) + ")");
        
        else
            httpResponse.end(JSON.stringify(resultObj));
    }
    , writeError: function (httpResponse, errObj, jsonpCallback) {
        httpResponse.writeHead(400, { 'Content-Type': 'application/json' });
        if (jsonpCallback)
            // if the callback parameter is present wrap the JSON
            // into this parameter => convert to JSONP        
            httpResponse.end(jsonpCallback + "(" + JSON.stringify(errObj) + ")");

        else
            httpResponse.end(JSON.stringify(errObj));
    }
   
}


