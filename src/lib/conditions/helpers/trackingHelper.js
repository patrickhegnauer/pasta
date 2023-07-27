'use strict';
var extensionSettings = turbine.getExtensionSettings();
var window = require('@adobe/reactor-window');
window.TrackingHelper = window.TrackingHelper || {};

try{

TrackingHelper.console = function(text){

  if(typeof window.console !== "undefined"){
    if(typeof window.console.log !== "undefined" && _satellite.environment.stage !== "production" && extensionSettings.debugMode){
      window.console.log(text);
    }
  }
}

// isEmailLink: checks if a url contains a mailto: prefix
	// returns true or false
	TrackingHelper.isEmailLink = function(url) {
		if (url.search("mailto:") !== -1) {
			return true;
		} else {
			return false;
		}
};
	// isPhoneLink: checks if a url contains a tel: prefix
	// returns true or false
	TrackingHelper.isPhoneLink = function(url) {
		if (url.search(/^tel:/) !== -1) {
			return true;
		} else {
			return false;
		}
};
	// isDownloadLink: checks if a link matches a predefined set of filetypes to be counted as a download
	// returns true or false
	TrackingHelper.isDownloadLink = function(url) {
			var fileTypeString = new RegExp("\\.(?:avi|css|csv|doc|docx|eps|exe|feed|gif|ics|jpg|js|m4v|mov|mp3|pdf|png|ppt|pptx|rar|tab|txt|vsd|vxd|wav|wma|wmv|xls|xlsx|xml|zip)($|\\&|\\?|\\#)");
			// 2.0 test input url against filetype RegEx
			return fileTypeString.test(url);
		
};
    //isSocialLink: checks if a link is social
	TrackingHelper.isSocialLink = function(url){

		return /(\.|^)(facebook|twitter|instagram|youtube)\.((?!\.).)*$/.test(slashedURLObject.event_attributes_tgtHostname);
};
    //isOnsiteLink: checks if a link is on or offsite
	TrackingHelper.isOnsiteLink = function(url){
		var onsiteDomainString = new RegExp("^" + window.location.hostname + "(\/.*)?");
		return onsiteDomainString.test(url);
		
};

  
  TrackingHelper.findParentNode = function(node) {
    var current = node; 
    var list = [];
    while (current.parentNode != null && current.parentNode != document.documentElement) {
        list.push(current.parentNode);
        current = current.parentNode;
    }
    return list
};

    // URLslasher: splits a URL into all necessary parts
	// type denotes either target, page
	TrackingHelper.URLslasher= function(type, url) {
		// initialise empty object to work with later on
        window.slashedURLObject = window.slashedURLObject || {};
		
		if (url !== "") {
			// Check if input URL doesn't contain a protocol
			// if not add a protocol, so the property "href" (see below) works
			var startWithDoubleSlash = new RegExp("^\/\/.*"); // string starts with double slashes
			var startWithProtocol = new RegExp("^[a-zA-Z]*:.*"); // the "normal" case we want to see
			var parser, correct_pathname;
			if (startWithDoubleSlash.test(url)) { // should not happen, but if it still does, we fix it!
				url = window.location.protocol + url;
			} else if (!(startWithProtocol.test(url))) { // if protocol is missing, add current page's protocol per default
				url = window.location.protocol + "//" + url;
			}
			// Create new link element on page
			parser = document.createElement('a');
			// Use attribute "href" to turn observed input into a URL-shaped object
			parser.href = url;
			if( typeof(parser.protocol) !== 'undefined' && parser.protocol.match(/http|isurf/i) ){
				correct_pathname = (parser.pathname.charAt(0) !== '/' ? '/' : '') + parser.pathname;
				if (type == "target") {
					slashedURLObject['event_attributes_tgtURL'] = url;
					slashedURLObject['event_attributes_tgtHostname'] = parser.hostname;
					slashedURLObject['event_attributes_tgtPath'] = correct_pathname;    
					slashedURLObject['event_attributes_tgtQuery'] = parser.search.replace('?', '');
					slashedURLObject['event_attributes_tgtURLfragmentIdentifier'] = parser.hash.replace('#', '');
					TrackingHelper.console("[TrackingHelper.URLslasher] URL slashed into >" + type + "< TMS variables");
				}   else {
					TrackingHelper.console("[TrackingHelper.URLslasher] type of URL not given, URL not slashed into TMS variables");
				}
			} else {
				TrackingHelper.console("[TrackingHelper.URLslasher] protocol of URL is not http, URL not slashed into TMS variables");
			}
		} else {
			TrackingHelper.console("[TrackingHelper.URLslasher] input URL is empty, nothing to slash into bits");
		}
		return slashedURLObject;
	};

	TrackingHelper.URLconstructor = function(url) {
		if (url) {
			// Prepare RegEx for validation
			var startWithProtocol = new RegExp("^[a-zA-Z]*:.*");
			var isProtocolRelative = new RegExp("^\/\/.*");
			var startWithSlash = new RegExp("^\/[^\/].*"); 
			var startWithDot = new RegExp("^\.(\.?)\/.*");
			var startWithHash = new RegExp("^#.*");

			if (startWithProtocol.test(url) || isProtocolRelative.test(url)) {
				TrackingHelper.console("[TrackingHelper.URLconstructor] Input URL appears to be a valid absolute URL => input not converted");
				return (url);
			} else if (startWithSlash.test(url)) {
				// 1. Does Target URL start with a slash?
				// => add current domain to it
				// 1.1 Get current URL and split it
				var currentURL = window.location.href.split("/");
				// 1.2 Remove the current file name from current URL
				// However, if the current URL is the current folder without trailing slash, this step should be omitted!
				currentURL.pop();
				// 1.3 Re-unite current URL to have current folder
				var currentFolder = currentURL.join("/");
				// 1.4 Concat current folder and input URL
				TrackingHelper.console("[TrackingHelper.URLconstructor] Input URL completed - from: " + url + " to: " + currentFolder + url);
				return (currentFolder + url);
			} else if (startWithDot.test(url)) {
				// 2. Does input URL start with "./" or "../"?
				// 2.1 Get current URL and split it
				var currentURL = window.location.href.split("/");
				// 2.2 Remove the current file name from current URL
				// However, if the current URL is the current folder without trailing slash, this step should be omitted!
				currentURL.pop();
				// 2.3 Split input URL
				var url_split = url.split("/");
				// 2.4. Walk through input URL and attach relevant values to current URL to create new complete input URL
				for (var i = 0; i < url_split.length; i++) {
					if (url_split[i] == ".") {
						continue;
					} else if (url_split[i] == "..") {
						currentURL.pop();
					} else {
						currentURL.push(url_split[i]);
					}
				}
				// 2.5 Save converted URL
				TrackingHelper.console("[TrackingHelper.URLconstructor] Input URL completed - from: " + url + " to: " + currentURL.join("/"));
				return (currentURL.join("/"));
			} else if (startWithHash.test(url)) {
				// 3. Does input URL start with hash?
				// => add current URL to it
				if (window.location.href.indexOf('#') === -1) { // if current URL has anchor, cut off the anchor and replace it with the new anchor
					TrackingHelper.console("[TrackingHelper.URLconstructor] Input URL completed - from: " + url + " to: " + window.location.href + url);
					return (window.location.href + url);
				} else {
					TrackingHelper.console("[TrackingHelper.URLconstructor] Input URL completed - from: " + url + " to: " + window.location.href.substring(0, window.location.href.indexOf('#')) + url);
					return (window.location.href.substring(0, window.location.href.indexOf('#')) + url);
				}
			} else {
				// Get directory of currently viewed document.
				var currentDirectory = window.location.pathname.split("/");
				currentDirectory.pop();

				// Manually combine window.location properties to emulate
				// window.location.origin, since this property isn't supported by IE.
				var windowLocationOrigin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');

				// If the current URL does not have a slash after the host name, we
				// append the passed URL to the location origin to create an absolute
				// URL.
				if (currentDirectory.length === 0) {
					var completeURL = windowLocationOrigin + '/' + currentDirectory.join('/') + url;

					TrackingHelper.console("[TrackingHelper.URLconstructor] Input URL completed - from: " + url + " to: " + completeURL);
					return completeURL;
				}

				// If we've reached this point, the URL contains at least one slash
				// after the host name, which means we can remove everything after the
				// last slash and append the passed URL.
				currentURL = window.location.href.split("/");
				currentURL.pop();
				var url_split = url.split("/");
				for (var i = 0; i < url_split.length; i++) {
					if (url_split[i] == ".") {
						continue;
					} else if (url_split[i] == "..") {
						currentURL.pop();
					} else {
						currentURL.push(url_split[i]);
					}
				}

				TrackingHelper.console("[TrackingHelper.URLconstructor] Input URL completed - from: " + url + " to: " + currentURL.join("/"));
				return (currentURL.join("/"));
			}
		} else {
			TrackingHelper.console("[TrackingHelper.URLconstructor] Input URL is empty, nothing to convert");
			return (url);
		}
	};

	TrackingHelper.dataLayerPush = function (scope) 
  {
  var dataLayerEvent = {};
  if(scope == 'target'){
     dataLayerEvent = {
                    eventInfo: {
                        category: window.standardEventVarsObject["event_attributes_category"],
                        action: window.standardEventVarsObject["event_attributes_action"]
                    },
                    attributes:{
                      label: window.standardEventVarsObject["event_eventInfo_label"],
                      tgtURL: window.slashedURLObject['event_attributes_tgtURL'],
                      tgtHostname: window.slashedURLObject['event_attributes_tgtHostname'],
                      tgtPath: window.slashedURLObject['event_attributes_tgtPath'],
                      tgtQuery: window.slashedURLObject['event_attributes_tgtQuery']
                    }
}
}

  else if(scope == 'page'){
  dataLayerEvent = {
                    eventInfo: {
                        category: 'page_load',
                        action: 'default'
                    },
                    attributes:{
                      label: 'default'
                    }
                }
  }
  	
	window.digitalData = window.digitalData || {};
  	window.digitalData.event = window.digitalData.event || []

	window.digitalData.event.push(dataLayerEvent);
	TrackingHelper.console(dataLayerEvent)
	
};

TrackingHelper.piiChecker = function(url,queryString){
	//check for IE11
	if(Object.values){
  var dimensions = { 
  
	//change URL's
  URL : 		url, 
  URLQuery:		queryString
  
  }
  var regex_collection = {
  
  'regex_at' : /[^\/]{4}(@|%40)[^\/]{4}/gi,
  'regex_name' : /.*vorname=.*/,
  'regex_mail' : /.*mail=.*/,
  'regex_user' : /.*user=.*/
  
  }
  
  var size = Object.keys(dimensions).length;
  var size2 = Object.keys(regex_collection).length;
  
  var i;
  var ii;
  for(ii = 0; ii< size2 ; ii++){
	  for (i = 0; i < size; i++) {
	  if(Object.values(regex_collection)[ii].test(Object.values(dimensions)[i])){
	  
	  var index = Object.values(dimensions)[i].indexOf('?');
	  Object(dimensions)[Object.keys(dimensions)[i]] = Object(dimensions)[Object.keys(dimensions)[i]].slice(0,index) + '[PII DATA]'
	  }
	  else{
		
	  }
  }
  
  }
  //set dataelements
  _satellite.setVar('URL corrected',Object.values(dimensions)[0]);    
  _satellite.setVar('QueryString corrected',Object.values(dimensions)[1]);  

  if(Object.values(dimensions)[0].indexOf('[PII DATA]')>-1)
  TrackingHelper.console(
	'[TrackingHelper.piiChecker] URL converted, as it contains PII DATA: ' +  
	queryString)
    	}
		TrackingHelper.console('===================>[PASTA] PII Checker ended')
  };

  TrackingHelper.addToLocalStorageArray = function (name, value) 
 {
	// Get the existing data
	var existing = localStorage.getItem(name);

	// If no existing data, create an array
	// Otherwise, convert the localStorage string to an array
	existing = existing ? existing.split(',') : [];

	// Add new data to localStorage Array
	existing.push(value);

	// Save back to localStorage
	localStorage.setItem(name, existing.toString());
};

  

}
catch(e){
	TrackingHelper.console('TMSFehler: ' + e)
}



module.exports = function(settings) {
  // TODO Return whether the condition passes.
};
