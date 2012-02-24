define(function(){
    var templateLoader = {
      templateVersion: "0.0.1",
      templates: {},
      loadRemoteTemplate: function(templateName, filename, callback) {
		if (!this.templates[templateName]) {
          var self = this;
		  var cb = function(data){
			self.addTemplate(templateName,data);
			callback(data);
		  };
		  var error = function(data){
			var output = '';
			for (property in data) {
			  output += property + ': ' + data[property]+'; ';
			}
		  }
		
			if ($.browser.msie && window.XDomainRequest) {
		            // Use Microsoft XDR
		            var xdr = new XDomainRequest();
		            xdr.open("get", filename);
		            xdr.onload = function() {
						cb(xdr.responseText);
		            };
		            xdr.send();
		        } 
		else
		  $.ajax({
			url : filename,
			success : cb,
			error : error
		  });
        }

        else {
          callback(this.templates[templateName]);
        }
      },

      addTemplate: function(templateName, data) {
        this.templates[templateName] = data;
      },

      localStorageAvailable: function() {
       try {
          return 'localStorage' in window && window['localStorage'] !== null;
        } catch (e) {
          return false;
        }
      },

      saveLocalTemplates: function() {
        if (this.localStorageAvailable) {
          localStorage.setItem("templates", JSON.stringify(this.templates));
          localStorage.setItem("templateVersion", this.templateVersion);
        }
      },

      loadLocalTemplates: function() {
        if (this.localStorageAvailable) {
          var templateVersion = localStorage.getItem("templateVersion");
          if (templateVersion && templateVersion == this.templateVersion) {
            var templates = localStorage.getItem("templates");
            if (templates) {
              templates = JSON.parse(templates);
              for (var x in templates) {
                if (!this.templates[x]) {
                  this.addTemplate(x, templates[x]);
                }
              }
            }
          }
          else {
            localStorage.removeItem("templates");
            localStorage.removeItem("templateVersion");
          }
        }
      }
    };
    return templateLoader;
	//window.templateLoader = templateLoader;
})