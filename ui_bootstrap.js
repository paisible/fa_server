is_chrome = typeof chrome != "undefined";
if(typeof myApp != "undefined") background = myApp.background;
//var version = (is_chrome) ?  chrome.extension.getBackgroundPage().background.get_version() : background.get_version();
var version = 1;

require.config({
	paths: {
	   	remote : 'http://localtest.com:3000'
	  }
});

window.FA = {
	Views:{},
	Models : {},
	Collections : {}
}

require(["http://localtest.com:3000/jst.js", "http://localtest.com:3000/ui.js", "http://localtest.com:3000/data.js"], function(){
	FA.Models.assetModel = Backbone.Model.extend({
		url : function() {
		    modelUrl = "https://www.foreveralive.com/api/0/" + 'assets';
		    if(!this.isNew()) {
		      modelUrl += '/' + this.id;
		    }
		    return modelUrl;
		  },
		hasSecrets : function(){
			return false;
		}
	});

	FA.Collections.assetCollection = Backbone.Collection.extend({
		model: FA.Models.assetModel,
		url : function() {
		    return "https://www.foreveralive.com/api/0/" + 'assets';
		}
	});

	FA.Views.assetIndexView = Backbone.View.extend({
		render: function(){	
			out = JST["test"]({ assets: FA.assets.models, isFullList: true, nbForDomain : 5});
			$("#app").html(out);
		}
	});
	
	FA.assets = new FA.Collections.assetCollection(FA.data);
	
	FA.AppRouter = Backbone.Router.extend({
	  routes : {
	    "/assets" : "index",
		"*actions" : "index"
	  },

	  index : function() {
		view = new FA.Views.assetIndexView()
		view.render();
	  }
	});
	
	var initialize = function(){
		var app_router = new FA.AppRouter;
		Backbone.history.start();
	}
	
	initialize();
	
	FA.assets.fetch({success:function(){
	},
	error : function(error){
	}
	});

	FA.getDomainFromUrl = function(url) {
	    var a = document.createElement('a');
	    a.href = url.toLowerCase();
	    return a.hostname.replace(/www\./i, "").replace(/accounts\.google/i, "google").replace(/login\.yahoo/i, "yahoo").replace(/wwws\.mint/i, "mint");
	}

	FA.Background = { fa_member_id : 10337 }


	function loadCSS(url) {
	    var link = document.createElement("link");
	    link.type = "text/css";
	    link.rel = "stylesheet";
	    link.href = url;
	    document.getElementsByTagName("head")[0].appendChild(link);
	}

	loadCSS("http://localtest.com:3000/style.css");
	loadCSS("http://localtest.com:3000/topbars.css");
});



