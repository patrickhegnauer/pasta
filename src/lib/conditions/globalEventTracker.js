'use strict';
var trackingHelper = require('./helpers/trackingHelper');
var window = require('@adobe/reactor-window');

module.exports = function(settings,event) {
  try{

        //clear event objects
    window.standardEventVarsObject = {};
    window.slashedURLObject = {};

    //check if href is defined
      TrackingHelper.console("===================>[PASTA - GET] START");
      TrackingHelper.console("[PASTA - GET] event call detected");
      var dataElement = settings.excludeAction;
      if(event.element){
    if(event.element.href != undefined){
        //check if url is valid
               
        var event_attributes_tgtURL = TrackingHelper.URLconstructor(event.element.href) ;
        //slash into URL parts
        TrackingHelper.URLslasher('target',event_attributes_tgtURL);
        TrackingHelper.console("[PASTA - GET] Target Attributes generated");
    }
        var category = event.element.getAttribute("data-event-category")
        var action = event.element.getAttribute("data-event-action")
        var label = event.element.getAttribute("data-event-label")

      //new as of 2.0.5
      for (var i = 0; i < dataElement.length; i++) {
        if(action.indexOf(dataElement[i]) == 0){
          TrackingHelper.console("===================>[PASTA - GET] Exclude Flag set with values: " + action);
          TrackingHelper.console("===================>[PASTA - GET] END");
          return false
        }
     }
      


      //Return final vars in object
		  window.standardEventVarsObject = {
			"event_attributes_category": category,
			"event_attributes_action": action,
			"event_eventInfo_label": label
		}

    TrackingHelper.console(window.standardEventVarsObject)
    TrackingHelper.dataLayerPush('target');

        return true;
      } 
      else{
        TrackingHelper.console("===================>[PASTA - GET] href Element not valid")
        TrackingHelper.console("===================>[PASTA - GET] END")
        return false;
              }
    }
      
    catch(e){
      TrackingHelper.console('TMS Fehler: ' + e)
      
    }
};
