'use strict';

const trackingHelper = require("./helpers/trackingHelper");

module.exports = function(settings,event) {
  try{
   //clear event objects
   window.standardEventVarsObject = {};
   window.slashedURLObject = {};

     TrackingHelper.console("===================>[PASTA - EDT] START");
     TrackingHelper.console("[PASTA - EDT] event call detected");

     if(event.element){
      if(event.element.href != undefined){
          //check if url is valid
                 
          var event_attributes_tgtURL = TrackingHelper.URLconstructor(event.element.href) ;
          //slash into URL parts
          TrackingHelper.URLslasher('target',event_attributes_tgtURL);
          TrackingHelper.console("[PASTA - EDT] Target Attributes generated");
      }
    }
  
     var category = event.detail.category;
     var action = event.detail.action;
     var label = event.detail.label;

     TrackingHelper.console("[PASTA - EDT] Standard Attributes generated");
     //Return final vars in object
		  window.standardEventVarsObject = {
        "event_attributes_category": category,
        "event_attributes_action": action,
        "event_eventInfo_label": label
      }
  
      TrackingHelper.console(window.standardEventVarsObject)
      TrackingHelper.dataLayerPush('detail');
  
      return true;

  }
  catch(e){
    TrackingHelper.console('[PASTA - EDT] Fehler: ' + e)
  }
};
