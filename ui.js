require(
	['http://localtest.com:3000/templating.js'],
	
	function(templateLoader){
		is_chrome = typeof chrome != "undefined";

		if(typeof myApp != "undefined") background = myApp.background;

		if(is_chrome && typeof background == "undefined") {
			background = {};
			background.get_tabs = function(){
				return tabs = chrome.extension.getBackgroundPage().background.get_tabs();
			}
		}
		if(!$.browser.msie)
		var vault = templateLoader.loadRemoteTemplate("vault3","http://localtest.com:3000/views/vault.html",function(data){
			//alert("ok");
			$("body").append(data);
		});
	}
)

