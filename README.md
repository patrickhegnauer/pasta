# PASTA (Patrick's Amazing Standard Tracking Approach)
Basic Tracking Requirements Extension

This Adobe Launch private Extension provides several tracking features, based on standard tracking approaches.


# Features

This Extension provides Actions, Conditions, Data Elements and some helper. 

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

## Conditions
### Global Event Tracker
### Standard Event Tracker

## Data Elements


## Helpers
### TrackingHelper
### DataLayerHelper
