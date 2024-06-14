'use strict';

module.exports = function(settings) {
 // define getChash function
function getChash(chash,environment){
  var prefix = 'value=';
  var chashObj = chash;
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://consent'+ environment +'.css.ch/chash' + '?' + prefix + encodeURIComponent(chashObj), true);
  xhr.withCredentials = true;
  xhr.onreadystatechange = function() { // Call a function when the state changes.
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      var response = xhr;
    }
  }
  if(chash !== ''){
    xhr.send();
  }
}
 
try{
  var searchParams = new URLSearchParams(window.location.search);
  if(searchParams.size == 0){
    if(digitalData && digitalData.page && digitalData.page.attributes && digitalData.page.attributes.URLQueryString){
      searchParams = new URLSearchParams(digitalData.page.attributes.URLQueryString)
    }
    
  }
  //call getChash if dataLayer contains chash
  if (digitalData && digitalData.user && digitalData.user.userInfo && digitalData.user.userInfo.chash){
    getChash(digitalData.user.userInfo.chash, CookieHelper.settings.envShort);
  }
  //call getChash if userInfo cookie contains chash
  else if (CookieHelper.getCookie('userInfo').chash !== undefined) {
    getChash(JSON.parse(CookieHelper.getCookie('userInfo')).chash, CookieHelper.settings.envShort);
  }
  //call getChash if querystring contains chash
  else if(searchParams.has('chash')){
    getChash(searchParams.get('chash'),CookieHelper.settings.envShort)
  }
} catch(e) {
  TrackingHelper.console('TMS Fehler: ' + e)
}
};
