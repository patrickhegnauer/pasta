'use strict';
var trackingHelper = require('../conditions/helpers/trackingHelper');
var window = require('@adobe/reactor-window');

module.exports = function(settings) {
  try{
  var url = settings.url;
  var queryString = settings.queryString;
  TrackingHelper.console('===================>[PASTA] PII Checker started')
  TrackingHelper.piiChecker(url,queryString);
  }
  catch(e){
    TrackingHelper.console('TMSFehler: ' + e)
  }
};
