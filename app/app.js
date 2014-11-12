var express = require('express')
  , http = require('http')
  , path = require('path')
  , hogan = require('hogan.js')
  , request = require('request')
  , routes = require('./routes');

var app = module.exports = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'hjs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, '../public')));
  app.use(function(req, res) { res.status(404); res.render('index', { title: '404' }); });
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

//configure routes
app.get('/', routes.index);
// app.get('/weather/:state/:city', routes.weather);
// app.get('/search/tag/:search', routes.json, routes.instagram_search);
app.get('/search/location/:lat/:long', routes.json, routes.instagram_location);
app.get('/search/user/:username', routes.json, routes.instagram_user_search);
app.get('/search/tag/:tag', routes.json, routes.instagram_tag_media_recent);


//initiate the app server
http.createServer(app).listen(app.get('port'), function(){
  console.log("cooper-union-weather-proxy running on port " + app.get('port'));
});
