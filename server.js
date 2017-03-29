var express = require('express');
var http = require('http');
var request = require('request');


// Initialise
var app = express();

/**
 * Set up CORS Settings
 */ app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'null');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Pass to next layer of middleware
    next();
});/**
    */

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));


/** Set Up Logging
 */ var winston = require('winston');
global.__logger = new (winston.Logger)({
    level : 'silly',
    transports: [
        new (winston.transports.Console)({
            colorize: true,
            timestamp: true
        }),
        new (winston.transports.File)({
            filename: './logs/server.log',
            timestamp: true
        })
    ]
});
/**
*/
var ajax = require("./ajax");

// Open API for receieving POst req
app.get('/sendSMS', function(req, res){

console.log("asd")
   ajax.sendSMS("Hello","918968999927");

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('ok');
});

var server = app.listen(8000, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("Server listening at http://%s:%s", host, port)

})


