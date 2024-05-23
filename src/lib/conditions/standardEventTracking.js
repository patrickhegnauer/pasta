'use strict';

var trackingHelper = require('./helpers/trackingHelper');
var window = require('@adobe/reactor-window');

module.exports = function(settings,event) {

try{
  
  // TODO Return whether the condition passes.
  var event_attributes_tgtURL = 'not-set';
  var extensionSettings = turbine.getExtensionSettings();
  TrackingHelper.console("===================>[PASTA-SET] START");
  TrackingHelper.console("[PASTA-SET] Configuration: Download: " + extensionSettings.downloadFlag + 
  " | " + "Offsite: " + extensionSettings.offsiteFlag +
  " | " + "Social: " + extensionSettings.socialFlag +
  " | " + "Mail: " + extensionSettings.mailFlag +
  " | " + "Phone: " + extensionSettings.phoneFlag
  )
  TrackingHelper.console("[PASTA-SET] event call detected");

  if(event.target.dataset.eventCategory === undefined && event.target.parentElement.dataset.eventCategory === undefined && event.target.parentElement.parentElement.dataset.eventCategory === undefined ){
  
  //clear event objects
  window.standardEventVarsObject = {};
  window.slashedURLObject = {};

  //check Parent Nodes	
	if (event.target !== "") {
    var parentNodeCounter = 0;
    while (parentNodeCounter <= 5) {
        if (TrackingHelper.findParentNode(event.target)[parentNodeCounter].localName == "body") {
            break;
        }
      else if (event.target.localName == "a"){
      event_attributes_tgtURL = event.target.href;
        break;
      }
      else if (TrackingHelper.findParentNode(event.target)[parentNodeCounter].localName == "a" && TrackingHelper.findParentNode(event.target)[parentNodeCounter].href !== undefined) {
            event_attributes_tgtURL = TrackingHelper.findParentNode(event.target)[parentNodeCounter].href;
            break;
        } else {
            event_attributes_tgtURL = "";
            parentNodeCounter++;
        }
    }
  }

 
  //Slash Event Target Parts
  TrackingHelper.URLslasher('target',event_attributes_tgtURL);
  //check if it is an onsitelink
 if(TrackingHelper.isOnsiteLink(slashedURLObject.event_attributes_tgtHostname)=== false || TrackingHelper.isDownloadLink(slashedURLObject.event_attributes_tgtPath)==true){
  
  // Set standard event flags (based on target URL)
  TrackingHelper.console("[PASTA-SET] Set Standard Event Flags start...");

  if(extensionSettings.downloadFlag){
  // Set flag for 'Download' case
  var isDownload = TrackingHelper.isDownloadLink(event_attributes_tgtURL);
  var event_attributes_isDownload = isDownload.toString();
  TrackingHelper.console("[PASTA-SET] Set Download Link flag to = " + isDownload.toString());
  }
  if(extensionSettings.mailFlag){
  // Set flag for 'Mailto' case
  var isMailto = TrackingHelper.isEmailLink(event_attributes_tgtURL);
  var event_attributes_isMailto = isMailto.toString();
  TrackingHelper.console("[PASTA-SET] Set Mailto Link flag to = " + isMailto.toString());
  }
  if(extensionSettings.offsiteFlag){
  // Set flag for 'OnSite' case
  var isOnsite = TrackingHelper.isOnsiteLink(slashedURLObject.event_attributes_tgtHostname); 
  var event_attributes_isOnsite = isOnsite.toString();
  TrackingHelper.console("[PASTA-SET] Set Onsite Event flag to = " + isOnsite.toString());
  }
  if(extensionSettings.phoneFlag){
  // Set flag for 'Phone' case
  var isPhone = TrackingHelper.isPhoneLink(event_attributes_tgtURL);
  var event_attributes_isPhone = isPhone.toString();
  TrackingHelper.console("[PASTA-SET] Set Phone Link flag to = " + isPhone.toString());
  }
  if(extensionSettings.socialFlag){
  // Set flag for 'Social' case
  var isSocial = TrackingHelper.isSocialLink(event_attributes_tgtURL);
  var event_attributes_isSocial = isSocial.toString();
  TrackingHelper.console("[PASTA-SET] Set Social Link flag to = " + isSocial.toString());
  }
  TrackingHelper.console("[PASTA-SET] Set Standard Event Flags complete");
	TrackingHelper.console("[PASTA-SET] Create Standard Event Variables start...");

  // Define event variables
  var category = 'not-set';
  var action = 'not-set';
  var label = 'not-set';

  // Set variables for 'Offsite' case
		// check flag
    if(extensionSettings.offsiteFlag){
		if (event_attributes_isOnsite.toLowerCase() === "false") {
			// set associated variables
			category = extensionSettings.oCategory;
			action = extensionSettings.oAction;
			label = slashedURLObject['event_attributes_tgtHostname'] + slashedURLObject['event_attributes_tgtPath'];
			TrackingHelper.console("[PASTA-SET] Standard Event 'Offsite' values set");
		}
  }

  // Set variables for 'Download' case
		// check flag
    if(extensionSettings.downloadFlag){
		if (event_attributes_isDownload.toLowerCase() === "true") {
			// set associated variables
			category = extensionSettings.dCategory;
			action = extensionSettings.dAction;
			label = slashedURLObject['event_attributes_tgtPath'];
			TrackingHelper.console("[PASTA-SET] Standard Event 'Download' values set");
		}
  }
    // Set variables for 'Phone' case
		// check flag
    if(extensionSettings.phoneFlag){
		if (event_attributes_isPhone.toLowerCase() === "true") {
			// set associated variables
			category = extensionSettings.pCategory;
			action = extensionSettings.pAction;
      //get telnr  
      var index = event_attributes_tgtURL.search(':')
      index = index+1;
      label = event_attributes_tgtURL.substring(index,event_attributes_tgtURL.length);
      TrackingHelper.console("[PASTA-SET] Standard Event 'Phone' values set");
		}
  }
 
    // Set variables for 'Social' case
		// check flag
    if(extensionSettings.socialFlag){
		if (event_attributes_isSocial.toLowerCase() === "true") {
			// set associated variables
			category = extensionSettings.sCategory;
          if(slashedURLObject["event_attributes_tgtPath"].indexOf('share') > -1){
			action = "Social Share";
          }
          else{
            action = "Social Follow";
          }
			label = slashedURLObject['event_attributes_tgtHostname'];
			TrackingHelper.console("[PASTA-SET] Standard Event 'Social' values set");
		}
  }

    // Set variables for 'Mailto' case
		// check flag
    if(extensionSettings.mailFlag){
		if (event_attributes_isMailto.toLowerCase() === "true") {
			// set associated variables
			category =  extensionSettings.mCategory;
			action =  extensionSettings.mAction;
			if(event.target.href == undefined){
            label = event_attributes_tgtURL.substr(7);
            }
          else{
			label= event.target.href.substr(7);
            }
            TrackingHelper.console("[PASTA-SET] Standard Event 'Mailto' values set");
		}
  }
    var chain = category + '|' + action + '|' + label;
    //Return final vars in object
		window.standardEventVarsObject = {
			"event_attributes_category": category,
			"event_attributes_action": action,
			"event_eventInfo_label": label,
      "event_eventInfo_chain":chain
		};

    if(window.standardEventVarsObject["event_attributes_category"] == "not-set"){
      TrackingHelper.console("[PASTA-SET] Create Standard Event Variables complete");
      TrackingHelper.console("[PASTA-SET] Event not triggered, as Selection was not set active");
      TrackingHelper.console("===================>[PASTA-SET] END");
      return false
    }

    if(extensionSettings.datalayerPush){
    TrackingHelper.dataLayerPush('target');
    }
    
		TrackingHelper.console("[PASTA-SET] Create Standard Event Variables complete");
    TrackingHelper.console("[PASTA-SET] Event triggered");
    TrackingHelper.console("===================>[PASTA-SET] END");
  }
  else{
    TrackingHelper.console("[PASTA-SET] Onsite Link triggered");
    TrackingHelper.console("[PASTA-SET] No Event triggered");
    TrackingHelper.console("===================>[PASTA-SET] END");
    return false
  }

}

else{
    TrackingHelper.console("[PASTA-SET] Data-Attribute Tracking found");
    TrackingHelper.console("[PASTA-SET] No Event triggered");
    TrackingHelper.console("===================>[PASTA-SET] END");
    return false
  }

  return true

}
  catch(e){
    TrackingHelper.console('TMSFehler: '+ e)
  }

};

