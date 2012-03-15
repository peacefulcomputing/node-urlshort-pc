
/**
 * Module dependencies.
 */

var express = require('express'),
	routes = require('./routes');
	
require('./config');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Run the initialization function inside Peaceful Computing's controller.
// This is where the initialization magic happens.
routes.urlshortpc().initialize();

// Routes
// The index page
app.get('/', routes.urlshortpc().index);

// The shorten request URL (will be requested via ajax)
app.get('/shorten', routes.urlshortpc().shorten);

// The regex for forwarding URLs
app.get(/^\/[a-zA-Z0-9]+$/, routes.urlshortpc().forward);

app.listen(config.localPort, config.localIP);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
