
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , mongoose = require('mongoose');

var app = module.exports = express.createServer(),
    mongo_url;

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: "some really strong secret" }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  mongo_url = 'mongodb://localhost/express_demo_development';
});

app.configure('production', function(){
  app.use(express.errorHandler());
  mongo_url = 'mongodb://localhost/express_demo_production';
});

mongoose.connect(mongo_url);

// Routes

app.get('/', routes.index);
app.get('/posts',routes.posts.index);
app.get('/posts/add',routes.posts.add);
app.post('/posts',routes.posts.create);
app.get('/posts/:id',routes.posts.show);

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
