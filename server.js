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

var constant=require("./CONSTANTS");

// Open API for receieving POst req

		
		
		
		

app.get('/sendSMS', function(req, res){
 
console.log("asd");
   //ajax.sendSMS("positive case ","");
   
var username = "saurabh";
    var pass = "Dhis1234";
	var auth = "Basic " + new Buffer(username + ":" + pass).toString("base64");
	console.log(auth);
	
	ajax.getReq("http://localhost:8080/aes/api/events.json?program=a9cQSlDVI2n&orgUnit=zpkwWCuP8oc&trackedEntityInstance=ensvQUMh8FF&paging=false",auth,callback);
	
  res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('ok');
	
	function callback(error,response,body){
		//console.log(error);
		
		var data=JSON.parse(body);
		//console.log(data);
		
		for(var i=0;i<data.events.length;i++)
		{
			
				for(var k=0;k<data.events[i].dataValues.length;k++)
				{
			var id=data.events[i].dataValues[k].dataElement;
			
		
			if(id==constant.sample_sent_to_Apex_Lab)              //  Is CSF sample sent to Apex Lab?
			{
				console.log(id);
				var val=data.events[i].dataValues[k].value;
				if(val=="true")
				{
					console.log("       "+val);
				}
			}
			//-----------------------
			
			else if(id==constant.CSF_sample_2_JE_IgM)              //  Lab results - CSF sample 2 - JE IgM
			{
				console.log(id);
				var val=data.events[i].dataValues[k].value;
				if(val=="Positive")
				{
					console.log("       "+val);
				}
			}
			//-----------------------
			
			else if(id==constant.Lab_results_CSF_JE_IgM)              //  Lab results - CSF - JE IgM
			{
				console.log(id);
				var val=data.events[i].dataValues[k].value;
				if(val=="Positive")
				{
					console.log("       "+val);
				}
			}
			//-----------------------
			
			else if(id==constant.Lab_results_Malaria_rapid_diagnostic_test)              //  Lab results - Malaria rapid diagnostic test"
			{
				console.log(id);
				var val=data.events[i].dataValues[k].value;
				if(val=="V +")
				{
					console.log("       "+val);
				}
			}
			//----------------------
		
			else if(id==constant.Lab_results_Serum_sample_2_JE_gM)              //  Lab results - Serum sample 2 - JE IgM"
			{// if (id == exports.labResultSerumSample2_JeIgm)
				console.log(id);
				var val=data.events[i].dataValues[k].value;
				if(val=="Positive")
				{
					console.log("       "+val);
				}
			}
			//----------------------
			
			else if(id==constant.Lab_results_Serum_JE_IgM)              //  Lab results - Serum - JE IgM"
			{
				console.log(id);
				var val=data.events[i].dataValues[k].value;
				if(val=="Positive")
				{
					console.log("       "+val);
				}
			}
			//----------------------
			
			else if(id==constant.Lab_results_Malaria_smear_results)              //  Lab results -Malaria smear results
			{
				console.log(id);
				var val=data.events[i].dataValues[k].value;
				if(val=="PV")
				{
					console.log("       "+val);
				}
			}
			//--------------------
		
			
			//---------------------
		
			else if(id==constant.Follow_up_visit_Lab_results_Serum_JE_IgM)              // Follow up visit - Lab results - Serum - JE IgM
			{
				console.log(id);
				var val=data.events[i].dataValues[k].value;
				if(val=="Positive")
				{
					console.log("       "+val);
				}
			}
			//----------------------
		
			else if(id==constant.Follow_up_visit_Lab_results_Serum_Scrub_typhus_IgG)              // Follow up visit - Lab results - Serum - JE IgM
			{
				console.log(id);
				var val=data.events[i].dataValues[k].value;
				if(val=="Positive")
				{
					console.log("       "+val);
				}
			}
			//--------------------
			
			else if(id==constant.Lab_results_Serum_IgM_DEN)              // Lab results - Serum - IgM DEN
			{
				console.log(id);
				var val=data.events[i].dataValues[k].value;
				if(val=="Positive")
				{
					console.log("       "+val);
				}
			}
			//----------------------
			
			 else if(id==constant.Scrub_typhus_IgM)              // Lab results - Serum - Scrub typhus IgM
			{
				console.log(id);
				var val=data.events[i].dataValues[k].value;
				if(val=="Positive")
				{
					console.log("       "+val);
				}
			}
			
			//-----------------------
				}
		}
		
		// K24hMmaJvrV   Lab results - CSF sample 2 - JE IgM"
		//N6Yfs0jO6FY    Lab results - CSF - JE IgM
		//v5WLB0ggt1y   Lab results - Malaria rapid diagnostic test"
		//KVJSXRivsHL   Lab results - Serum sample 2 - JE IgM"
		// DG9PTsQmliZ  Lab results - Serum - JE IgM
		// kspIAuMSEXO Lab results - Malaria smear results"
		// v5WLB0ggt1y "Lab results - Malaria rapid diagnostic test"
		// LpT8hxDYDHq  "Follow up visit - Lab results - Serum - JE IgM"
		// SyVZXV49iO9  "Follow up visit - Lab results - Serum - Scrub typhus IgG
		// DHpb0qQ61ZE Lab results - Serum - IgM DEN
		// LhrbwYEYv20 Lab results - Serum - Scrub typhus IgM
	}
	
});
				
				


var server = app.listen(8000, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("Server listening at http://%s:%s", host, port)


})


