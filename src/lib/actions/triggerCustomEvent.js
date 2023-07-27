'use strict';

var extensionSettings = turbine.getExtensionSettings();

module.exports = function(settings) {
  try{

    var event = new CustomEvent('event-action-trigger', {
      detail: {
        category: settings.category,
        action: settings.action,
        label: settings.label
      }
    });
    document.body.dispatchEvent(event);

  }
  catch(e){
    TrackingHelper.console('TMSFehler: ' + e)
  }
};
