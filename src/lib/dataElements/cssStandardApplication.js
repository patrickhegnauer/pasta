'use strict';

module.exports = function(settings) {
  var extensionSettings = turbine.getExtensionSettings();
  return extensionSettings.applicationName
};
