var express = require('express');
var http = require('http');
var request = require('request');


// Initialise
var app = express();

/**
 * Set up CORS Settings
 */ app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

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
  
var username = "gitika";
var pass = "Giti1234";
var auth = "Basic " + new Buffer(username + ":" + pass).toString("base64");
var DHIS2_BASE = "http://localhost:8090/dhis";


function gotPhoneNumberCallback(eventUID,error,response,body){
    if (error){return}
    
    var users = JSON.parse(body);
    users=users.users;
    var phones = "";

    for (var i=0;i<users.length;i++){
        if (users[i].phoneNumber){
            phones=phones+users[i].phoneNumber+",";
        }
    }

console.log(phones);
    ajax.getReq(DHIS2_BASE + "/api/events/"+eventUID+".json",auth,callback.bind(null,phones));


	function callback(phones,error,response,body){
		
	    if (error){return}

		var data=JSON.parse(body);
		
	    var orgid=data.orgUnit;
		
	    var trackentity=data.trackedEntityInstance;
		
			var obj=[];
			
			//------------------------------------get name and value --------------------------------------
			
			ajax.getReq1(DHIS2_BASE + "/api/trackedEntityInstances.json?ou="+orgid,auth,callback,trackentity);
	function callback(error,response,body,trackentity){
		var data1=JSON.parse(body);
		//console.log(error);
		var trackid=trackentity;
		
		console.log("in server file"+trackid);
		 var objectname=[];
		
		    for(var i=0;i<data1.trackedEntityInstances.length;i++)
			{
				var trackent=data1.trackedEntityInstances[i].trackedEntityInstance;
				//console.log(trackent);
				for(var j=0;j<data1.trackedEntityInstances[i].attributes.length;j++)
				{
					
				var attrbt=data1.trackedEntityInstances[i].attributes[j].attribute;
				if((attrbt=="B8Ohks1Zf91"||attrbt=="eZAMzTucu0x")&& trackent==trackid)
				{
					objectname.push(data1.trackedEntityInstances[i].attributes[j].value);
					
			
				}
				}
		
	               }
	                   console.log(objectname);
	//--------------------------------------------------------------------------------------------------------------
			
				for(var k=0;k<data.dataValues.length;k++)
				{
			var id=data.dataValues[k].dataElement;
			
		
			if(id==constant.sample_sent_to_Apex_Lab)             
			{
				
				var val=data.dataValues[k].value;
				if(val=="true")
				{
					//ajax.sendSMS(" CSF Sample Sent To ApexLab"+"  "+"PatientName"+"-"+objectname[1]+"  "+"value"+"-"+objectname[0],phones);
					
					console.log("Sample Sent To ApexLab"+"  "+"PatientName"+"-"+objectname[1]+"  "+"value"+"-"+objectname[0]);
					
				}
			}
			
			
			else if(id==constant.CSF_sample_2_JE_IgM)             
			{
				
				var val=data.dataValues[k].value;
				if(val=="Positive")
				{
					obj.push(val);
				
					
				}
			}
			
			
			
			else if(id==constant.Lab_results_CSF_JE_IgM)            
			{
				
				var val=data.dataValues[k].value;
				if(val=="Positive")
				{
					obj.push(val);
					
				}
			}
			
			else if(id==constant.Lab_results_Malaria_rapid_diagnostic_test)            
			{
				
				var val=data.dataValues[k].value;
				if(val=="V +")
				{
					obj.push(val);
					
				}
			}
			
		
			else if(id==constant.Lab_results_Serum_sample_2_JE_gM)             
			{
				
				var val=data.dataValues[k].value;
				if(val=="Positive")
				{
					obj.push(val);
					
				}
			}
			
			
			else if(id==constant.Lab_results_Serum_JE_IgM)             
			{
				
				var val=data.dataValues[k].value;
				if(val=="Positive")
				{
					obj.push(val);
					
				}
			}
			
			
			else if(id==constant.Lab_results_Malaria_smear_results)              
			{
				
				var val=data.dataValues[k].value;
				if(val=="PV")
				{
					obj.push(val);
					
				}
			}
			
		
			
			
		
			else if(id==constant.Follow_up_visit_Lab_results_Serum_JE_IgM)              
			{
				
				var val=data.dataValues[k].value;
				if(val=="Positive")
				{
						obj.push(val);
				}
			}
			
		
			else if(id==constant.Follow_up_visit_Lab_results_Serum_Scrub_typhus_IgG)             
			{
				
				var val=data.dataValues[k].value;
				if(val=="Positive")
				{
					obj.push(val);
				}
			}
			
			
			else if(id==constant.Lab_results_Serum_IgM_DEN)              
			{
				
				var val=data.dataValues[k].value;
				if(val=="Positive")
				{
						obj.push(val);
				}
			}
			
			
			 else if(id==constant.Scrub_typhus_IgM)             
			{
				
				var val=data.dataValues[k].value;
				if(val=="Positive")
				{
						obj.push(val);
				}
			}
			
			
			 else if(id==constant.Zika)             // Event 2 Lab results - Zika PCR
			{
				
				var val=data.dataValues[k].value;
				if(val=="Positive")
				{
					
						obj.push(val);
				}
			}
			 else if(id=="PLGdIMsKL8n")            
			{
				
				var val=data.dataValues[k].value;
				
				if(!val=="")
				{
					//ajax.sendSMS("CSF Sample recieved"+"  "+"PatientName"+"-"+objectname[1]+"  "+"value"+"-"+objectname[0],phones);
					console.log("CSF Sample recieved"+"  "+"PatientName"+"-"+objectname[1]+"  "+"value"+"-"+objectname[0]);
						
				}
			}
			 else if(id=="S7lh1zoePbe")            
			{
				
				var val=data.dataValues[k].value;
				
				if(!val=="")
				{
					//ajax.sendSMS("Serum Sample recieved"+"  "+"PatientName"+"-"+objectname[1]+"  "+"value"+"-"+objectname[0] ,phones);
					console.log("Serum Sample recieved"+"  "+"PatientName"+"-"+objectname[1]+"  "+"value"+"-"+objectname[0]);
						
				}
			}
			
			}
			
				//console.log(obj);
				if(obj.length>0)
				{
					//ajax.sendSMS("Positive Case Found"+"  "+"PatientName"+"-"+objectname[1]+"  "+"value"+"-"+objectname[0],phones);
					console.log("send sms");
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
		// CvndfGdof4G  Lab results - Zika PCR
	      }
	  }

}


// Open API for receieving POst re
app.post('/sendSMS', function(req, res){
 

   //ajax.sendSMS("positive case ","");
 
	var eventUID = req.body.event;
    var eventOrgUnit = req.body.orgUnit;
    var thiz = this;
	
    ajax.getReq(DHIS2_BASE + "/api/organisationUnits/"+eventOrgUnit+"?fields=users[phoneNumber]",auth,gotPhoneNumberCallback.bind(null,eventUID))
	
  res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('ok');
	
	
	
});
				
				


var server = app.listen(8001, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("Server listening at http://%s:%s", host, port)


})


