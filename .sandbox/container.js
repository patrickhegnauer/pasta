module.exports = {
  "extensions": {
    "css-standard-event-tracking": {
      "displayName": "CSS Standard Tracking",
      "settings": {
        "applicationName": "testing",
        "debugMode": true,
        "datalayerPush": true,
        "downloadFlag": true,
        "dCategory": "User Interaktion",
        "dAction": "Download",
        "dLabel": "",
        "offsiteFlag": true,
        "oCategory": "User Interaktion",
        "oAction": "Offsite",
        "oLabel": "",
        "socialFlag": true,
        "sCategory": "User Interaktion",
        "sAction": "",
        "sLabel": "",
        "mailFlag": true,
        "mCategory": "User Interaktion",
        "mAction": "Mail",
        "mLabel": "",
        "phoneFlag": true,
        "pCategory": "User Interaktion",
        "pAction": "Phone",
        "pLabel": ""
      }
    }
  },
  "dataElements": {
    "Event Category": {
      "settings": {},
      "cleanText": true,
      "forceLowerCase": true,
      "modulePath": "css-standard-event-tracking/src/lib/dataElements/eventCategory.js",
      "storageDuration": ""
    },
    "Timestamp": {
      "settings": {},
      "cleanText": true,
      "forceLowerCase": true,
      "modulePath": "css-standard-event-tracking/src/lib/dataElements/cssStandardTimestamp.js",
      "storageDuration": "pageview"
    }
  },
  "rules": [{
    "id": "RL1617874348315",
    "name": "Testing Link Tracking",
    "events": [{
      "modulePath": "sandbox/click.js",
      "settings": {}
    }],
    "conditions": [{
      "modulePath": "css-standard-event-tracking/src/lib/conditions/standardEventTracking.js",
      "settings": {}
    }],
    "actions": [{
      "modulePath": "css-standard-event-tracking/src/lib/actions/setVersionObject.js",
      "settings": {}
    }]
  }, {
    "id": "RL1618498703949",
    "name": "Testing PII",
    "events": [{
      "modulePath": "sandbox/pageTop.js",
      "settings": {},
      "order": "150"
    }],
    "actions": [{
      "modulePath": "css-standard-event-tracking/src/lib/actions/piiChecker.js",
      "settings": {
        "url": "www.css.ch?mail=me@bluewin.ch",
        "queryString": "mail=me@bluewin.ch"
      }
    }]
  }, {
    "id": "RL1619007303545",
    "name": "Testing Global Event Tracking",
    "events": [{
      "modulePath": "sandbox/click.js",
      "settings": {}
    }],
    "conditions": [{
      "modulePath": "css-standard-event-tracking/src/lib/conditions/globalEventTracker.js",
      "settings": {}
    }]
  }, {
    "id": "RL1621601166486",
    "name": "Set Version Object",
    "events": [{
      "modulePath": "sandbox/pageTop.js",
      "settings": {}
    }],
    "actions": [{
      "modulePath": "css-standard-event-tracking/src/lib/actions/setVersionObject.js",
      "settings": {
        "domain": "www.css.ch"
      }
    }]
  }],
  "property": {
    "name": "Sandbox property",
    "settings": {
      "domains": ["adobe.com", "example.com"],
      "linkDelay": 100,
      "trackingCookieName": "sat_track",
      "undefinedVarsReturnEmpty": false
    }
  },
  "company": {
    "orgId": "ABCDEFGHIJKLMNOPQRSTUVWX@AdobeOrg"
  },
  "buildInfo": {
    "turbineVersion": "26.0.2",
    "turbineBuildDate": "2021-07-01T11:44:08.892Z",
    "buildDate": "2021-07-01T11:44:08.892Z",
    "environment": "development"
  }
}