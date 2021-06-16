'use strict';
var extensionSettings = turbine.getExtensionSettings();
var window = require('@adobe/reactor-window');
var trackingHelper = require('../../lib/conditions/helpers/trackingHelper');
window.TMSDataLayer = window.TMSDataLayer || {};

try{
    //check if object exists
      TMSDataLayer.setDataLayer = function(application){
        
        window.digitalData = window.digitalData || {};
    
        var time = new Date(_satellite.buildInfo.buildDate);
        
        TrackingHelper.console('===================>[Launch Build]: '+ time);
        TrackingHelper.console('===================>[Applikation]: ' + application); 
        TrackingHelper.console('===================>[Environment]: ' + _satellite.buildInfo.environment);
     
        //set version object
        digitalData.version = {
          versionInfo : {
            datalayer: "css_dataLayer_v3.0",                                 //reference to solution design reference
            appmeasurement: "2.17.0",                                       //reference to appmeasurement version
            launch: _satellite.buildInfo.turbineVersion,                     //reference to launch version
            buildInfo: _satellite.buildInfo,                                //reference to buildVersion
            environment : _satellite.buildInfo.environment
          }
    }
        
    }
    }
    catch(err){
      TrackingHelper.console('TMS Fehler: ' + err);
    }

    