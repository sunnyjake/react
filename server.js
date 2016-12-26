var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.config');
var express = require('express');

var app = express();
var port = 3000;

var compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));
// app.use(express.static(__dirname));

// app.get('/', function(request, response){
//   response.sendFile(__dirname.concat('/index.html'))
// })
app.use("/", express.static(__dirname))
.listen(port, function(err){
  if(err){
    console.log(err);
  }
  else{
    console.log('Listening on %s', port);
  }
});
