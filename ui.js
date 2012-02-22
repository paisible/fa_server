is_chrome = typeof chrome != "undefined";

if(typeof myApp != "undefined") background = myApp.background;

if(is_chrome && typeof background == "undefined") {
	background = {};
	background.get_tabs = function(){
		return tabs = chrome.extension.getBackgroundPage().background.get_tabs();
	}
}

var FA = {
  Routers : {},
  Views : {
    App : {},
    Chrome : {},
    Assets : {},
    Secrets : {},
    Contacts : {},
    BlockedItems : {}
  }
}


FA.Routers.App = Backbone.Router.extend({
  routes : {
    "/index" : "index",
	"/tabs": "tabs"
  },

  index : function() {
    new FA.Views.App.Index({});
  },

  tabs : function() {
    new FA.Views.App.Tabs({});
  }

});

var router = new FA.Routers.App
Backbone.history.start();

var vault = templateLoader.loadRemoteTemplate("vault3","http://localhost:3000/views/vault.html",function(data){
	$("body").append(data);
});

