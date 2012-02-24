is_chrome = typeof chrome != "undefined";


var Background = function(){
	// FF framework - set in widget.js
	this.framework = null;
	
	this.state = {};
	this.tabs = {};
	
	this.add_tab = function(url){ this.tabs[url] = true;};
	this.remove_tab = function(url){ delete tabs[url];};	
	this.get_tabs = function(){ return this.tabs; }
	
	this.get_version = function(){
		try{
			if(is_chrome){
				return JSON.parse(localStorage["v"]);
			}
			else{
				return JSON.parse(this.framework.loadFile("v"));
			}
		}catch(exception){
			console.log("Error getting version from disk")
		}
	}
	
};

function poll_version(){
	var cb = function(data){
		if(is_chrome){
			localStorage["v"] = JSON.stringify(data)
		}
		else{
			if (typeof background.framework != "undefined"){
				background.framework.saveFile("v", JSON.stringify(data));
			}
		}
	};
	$.ajax({
		type: 'GET',
		url : 'http://localtest.com:3000/v.json',
		success: cb
	});
	setTimeout("poll_version()", 10000);
}

poll_version();

// first time we load, create state
background = new Background();

background.addTab = function(request){
	var url = request.url;
	this.add_tab(url);
	var tabs = this.get_tabs();
	return{
		tabs : tabs,
		faCallback : "showTabs"
	}
}

if(is_chrome){
	chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	  toReturn = null;
	  if(request.faTrigger){
		toReturn = background[request.faTrigger](request);
	  }
	  if(toReturn) {
	    sendResponse(toReturn);
	  };
	});
}