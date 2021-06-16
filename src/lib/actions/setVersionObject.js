'use strict';

var extensionSettings = turbine.getExtensionSettings();
var window = require('@adobe/reactor-window');
var dataLayerHelper = require('../../resources/dataLayerHelper/dataLayerHelper')
var trackingHelper = require('../../lib/conditions/helpers/trackingHelper');


TMSDataLayer.setDataLayer(extensionSettings.applicationName)

module.exports = function(settings) {
  
  try{
  var domain = settings.domain;

//set data environment
if(document.location.href.indexOf(domain) > -1){
  digitalData.version.versionInfo.dataEnvironment = 'live';
 
}
else{
  digitalData.version.versionInfo.dataEnvironment = 'test';
 
}
  }
  catch(e){
    TrackingHelper.console('TMSFehler: ' + e)
  }

  };
