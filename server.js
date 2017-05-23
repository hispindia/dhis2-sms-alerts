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
var DHIS2_BASE = "http://ds-india.org/aes";


function gotPhoneNumberCallback(eventUID,error,response,body){
    if (error){return}
    
    var users = JSON.parse(body);
    users=users.users;
    if (!users){
        __logger.info("No user found");
        return;
    }

    var phones = "";

    for (var i=0;i<users.length;i++){
        if (users[i].phoneNumber){
            phones=phones+users[i].phoneNumber+",";
        }
    }

    __logger.info("Phones="+phones);
    ajax.getReq(DHIS2_BASE + "/api/events/"+eventUID+".json",auth,callback.bind(null,phones));


    function callback(phones,error,response,body){
	
	if (error){
            __logger.error("err="+error);
            return
        }

	var data=JSON.parse(body);	
	var teiUID=data.trackedEntityInstance;
	
	var obj=[];
	
	//------------------------------------get name and value --------------------------------------
	
	ajax.getReq(DHIS2_BASE + "/api/trackedEntityInstances/"+teiUID+".json?",auth,gotName);
	function gotName(error,response,body){
            
	    var tei=JSON.parse(body);
	    //console.log(error);
	    
	    var teiName,teiAESID;
	    
            if (tei.attributes){
            for(var j=0;j<tei.attributes.length;j++)
	    {
		
		var attrbt=tei.attributes[j].attribute;
		if(attrbt=="B8Ohks1Zf91")
		{
		    teiName = tei.attributes[j].value;
		}

                if(attrbt=="eZAMzTucu0x")
		{
		    teiAESID = tei.attributes[j].value;
		}
            }
	    //--------------------------------------------------------------------------------------------------------------
	    
            }
	    
            if (!data.dataValues){ return }
        
	    for(var k=0;k<data.dataValues.length;k++)
	    {
		var id=data.dataValues[k].dataElement;
		
		
		if(id==constant.sample_sent_to_Apex_Lab)             
		{
		    
		    var val=data.dataValues[k].value;
		    if(val=="true")
		    {
			ajax.sendSMS(" CSF Sample Sent To ApexLab"+"  "+"PatientName"+"-"+teiName+"  "+"ID"+"-"+teiAESID,phones);
			
			__logger.info("Sample Sent To ApexLab"+"  "+"PatientName"+"-"+teiName+"  "+"ID"+"-"+teiAESID);
			
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
		else if(id==constant.Serum_sample_sent_to_Apex_Lab)             
		{
		    
		    var val=data.dataValues[k].value;
		    if(val=="true")
		    {
			ajax.sendSMS("Serum sample sent to Apex Lab"+"  "+"PatientName"+"-"+teiName+"  "+"ID"+"-"+teiAESID,phones);
			__logger.info("Serum sample sent to Apex Lab"+"  "+"PatientName"+"-"+teiName+"  "+"ID"+"-"+teiAESID);
		    }
		}
		
		
		
		else if(id==constant.CSF_sample_received)            
		{
		    
		    var val=data.dataValues[k].value;
		    
		    if(!val=="")
		    {
			ajax.sendSMS("CSF Sample recieved"+"  "+"PatientName"+"-"+teiName+"  "+"ID"+"-"+teiAESID,phones);
			__logger.info("CSF Sample recieved"+"  "+"PatientName"+"-"+teiName+"  "+"ID"+"-"+teiAESID);
			
		    }
		}
		else if(id==constant.Serum_sample_received)            
		{
		    
		    var val=data.dataValues[k].value;
		    
		    if(!val=="")
		    {
			ajax.sendSMS("Serum Sample recieved"+"  "+"PatientName"+"-"+teiName+"  "+"ID"+"-"+teiAESID ,phones);
			__logger.info("Serum Sample recieved"+"  "+"PatientName"+"-"+teiName+"  "+"ID"+"-"+teiAESID);
			
		    }
		}
		
	    }
	    
	    //__logger.info(obj);
	    if(obj.length>0)
	    {
		ajax.sendSMS("Positive Case Found"+"  "+"PatientName"+"-"+teiName+"  "+"ID"+"-"+teiAESID,phones);
		__logger.info("send sms");
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
    

    var eventUID = req.body.event;
    var eventOrgUnit = req.body.orgUnit;

    if (!eventUID || !eventOrgUnit){
        __logger.error("No information passed");
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end('ok');        
        return
    }
    var thiz = this;
    
    __logger.info("[[[Incoming Request]]] : eventUId="+eventUID+"EventOU="+eventOrgUnit);

    ajax.getReq(DHIS2_BASE + "/api/organisationUnits/"+eventOrgUnit+"?fields=users[phoneNumber]",auth,gotPhoneNumberCallback.bind(null,eventUID))
    
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('ok');    
    
});




var server = app.listen(8001, function () {

    var host = server.address().address
    var port = server.address().port

    __logger.info("Server listening at http://%s:%s", host, port)


})


