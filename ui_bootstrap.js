is_chrome = typeof chrome != "undefined";
if(typeof myApp != "undefined") background = myApp.background;

var version = (is_chrome) ?  chrome.extension.getBackgroundPage().background.get_version() : background.get_version();

var jst = document.createElement("script");
jst.src = "http://localhost:3000/jst.js?v=" + version.ui;
document.body.appendChild(jst);

var templating = document.createElement("script");
templating.src = "http://localhost:3000/templating.js";
document.body.appendChild(templating);

var ui = document.createElement("script");
ui.src = "http://localhost:3000/ui.js?v=" + version.ui; 
document.body.appendChild(ui);

var style = document.createElement("link");
style.href = "http://localhost:3000/style.css";
style.rel= "stylesheet";
style.type= "text/css";
document.head.appendChild(style);

var topbar = document.createElement("link");
topbar.href = "http://localhost:3000/topbar.css";
topbar.rel= "stylesheet";
topbar.type= "text/css";
document.head.appendChild(style);
