# PASTA (Patrick's Amazing Standard Tracking Approach)

Basic Tracking Requirements Extension

This Adobe Launch private Extension provides several tracking features, based on standard tracking approaches.

![alt pasta](https://github.com/patrickhegnauer/pasta/blob/master/src/resources/icons/pasta_2_0.svg?raw=true)

# Features

This Extension provides Actions, Conditions, Data Elements and some Helper. 

## Extension Config
- Add the current application name provided by the digital analytics team.
- Check if log should be provided in the browser console
- Check if events should be pushed into digitalData.event

## Actions
### PII Checker
#### Description:
The PII Checker Action checks the current URL and QueryString if they have following values:
- @ / %40
- vorname=
- mail=
- user=

If a URL or QueryString does have such value, it will be replaced by [PII Data]
#### Usage:
Add two new Data Elements with type custom code:
- PiiChecker - QueryString Output         | return _satellite.getVar('QueryString corrected')
- PiiChecker - URL Output                 | return _satellite.getVar('URL corrected')

Add the PiiChecker Action in every Pageload Rule (load first). Add the current URL and QueryString Data Element. 
Use the newly generated Data Elements to assign them to Adobe/Google Analytics.

### Set Version Object
#### Description:
This Action provides a console log (only in DEV/INT/VPR) with the current version and application. It also sets the environment variable, if it's test or live environment, based on the provided domain.
#### Usage:
Add this Action to a Rule and add the current live domain. If there are multiple language based domains, you can also provide a data element.

## Conditions
### Global Event Tracker
#### Description:
This Condition checks if a tracking link is tagged with data attributes. If it is tagged correctly it checks the URL if it fits in the defined format and then creates basic event tracking variables based on the data attributes.
Following DOM Objects are available:
- window.standardEventVarsObject
- window.slashedURLObject
#### Usage:
Create an event tracking rules which listens (mousedown or click) on [data-event-category]. Add the Global Event Tracker as Condition and add analytics actions (e.g. Set Variables from Adobe Analytics)

### Standard Event Tracker
#### Description:
This Condition checks if an Anchor Element was clicked. It also checkes if the element is already tagged with data attributes. If it is already tagged, it will skip proccessing. Otherwise if the extension is configured for specific link tracking events (e.g. Downloads). This Condition will check the link and provide Event Variables for the specific link. Following DOM Objects are available:
- window.standardEventVarsObject
- window.slashedURLObject
#### Usage:
Create an event tracking rules which listens (mousedown or click) on a, button elements. Add the condition and add some Actions (e.g. Set Variables from Adobe). 

## Data Elements
| Data Element  | Value |
| ------------- | ------------- |
| CSS Standard - Application  | Returns Application Name from Extension Config  |
| CSS Standard - Launch Environment | Returns satellite.buildInfo.environment  |
| CSS Standard - Timestamp  | Returns Timestamp in format: yyyy-mm-dd hh:mm:ss  |
| CSS Standard - Event Category  | Returns Event Category from Standard Event Object  |
| CSS Standard - Event Action  | Returns Event Action from Standard Event Object  |
| CSS Standard - Event Label  | Returns Event Label from Standard Event Object  |
| CSS Standard - Event Target Hostname  | Returns Event Target Hostname from Slashed Event Object  |
| CSS Standard - Event Target URL Path  | Returns Event Target URL Path from Slashed Event Object  |
| CSS Standard - Event Target URL  | Returns Event Target URL from Slashed Event Object |
| CSS Standard - Event Target QueryString  | Returns Event Target QueryString from Slashed Event Object  |


## Helpers
### TrackingHelper
This helper-class provides following functions:

| Function  | Description |
| ------------- | ------------- |
| console()  | Logs into browser console  |
| isEmailLink(url)  | Checks if the provided url is a Email Link  |
| isPhoneLink(url)  | Checks if the provided url is a Phone Link  |
| isDownloadLink(url)  | Checks if the provided url is a Download Link. Supported are avi,css,csv,doc,docx,eps,exe,feed,gif,ics,jpg,js,m4v,mov,mp3,pdf,png,ppt,pptx,rar,tab,txt,vsd,vxd,wav,wma,wmv,xls,xlsx,xml,zip  |
| isSocialLink(url)  | Checks if the provided url is a Social Link. Supported are Facebook, Instagram, Twitter, YouTube  |
| findParentNode(node)  | Checks if the parent Node is containing an anchor element  |
| URLslasher(type, url)  | Slashes the provided URL into target pieces  |
| URLconstructor(url)  | Checks if the provided URL is formatted correctly  |
| dataLayerPush(scope)  | Pushes information into DataLayer Event Object  |
| piiChecker(url,queryString)  | Checks if URL and QueryString containing PII Data |
| addToLocalStorageArray(name,value) | Adds new values to existing localStorage Parameter |

### DataLayerHelper
| Function  | Description |
| ------------- | ------------- |
| setDataLayer(application)  | Logs the version and timestamp to the browser console. Provides the version Object in the Data Layer  |
