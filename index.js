var express = require('express');

var app = express.createServer();
var pub = __dirname + '/';

app.configure(function() {
	app.use(express.errorHandler({ dump: true, stack: true }));
	app.use(express.cookieParser());
	app.use(express.bodyParser());
	app.use(express.session({ secret: 'mruff' }));
	app.set('views', pub);
	app.set("view options", {layout: false});
	  // make a custom html template
	app.register('.html', {
	  compile: function(str, options){
	    return function(locals){
	      return str;
	    };
	  }
	});
	app.use(app.router);
	app.use(express.static(pub));
});

/*
	Routing
*/
app.get('/', function(req, res){
	res.render('index.html');
});

app.listen(3000);