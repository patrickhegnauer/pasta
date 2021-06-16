'use strict';

var window = require('@adobe/reactor-window'); 

module.exports = function(settings) {
  
var currentDate = new window.Date();

var hours = currentDate.getHours();
hours = hours > 9 ? hours : '0' + hours;
var minutes = currentDate.getMinutes();
minutes = minutes > 9 ? minutes : '0' + minutes;
var seconds = currentDate.getSeconds();
seconds = seconds > 9 ? seconds : '0' + seconds;

var year = currentDate.getFullYear();
var month = currentDate.getMonth() + 1;
month = month > 9 ? month : '0' + month;
var day = currentDate.getDate();
day = day > 9 ? day : '0' + day;


var timestamp = hours +":"+ minutes+":" + seconds;
var dateString = year + "-" + month + "-" + day;

return dateString + " " + timestamp;
};
