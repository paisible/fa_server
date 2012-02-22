FA.Views.App.Index = Backbone.View.extend({
  initialize : function() {
    this.render();
  },

  render : function() {
       	out = JST["app/index"]({})
	   	$('#app').html(out);
  }
});

FA.Views.App.Tabs = Backbone.View.extend({
  
  initialize : function() {
    this.render();
  },

  render : function() {
	var tabs = background.get_tabs();
	
  }
});