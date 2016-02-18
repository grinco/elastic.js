'use strict';


// Listener port
var PORT = 8080;

var bodyParser = require('body-parser');

var express = require('express');
var connect = require('connect');
var http = require('http');

// HTTP listener
var app = express();

// gzip/deflate outgoing responses
var compression = require('compression');
app.use(compression());
// store session state in browser cookie
var cookieSession = require('cookie-session');
app.use(cookieSession({
    keys: ['secret1', 'secret2']
}));

app.use(bodyParser.urlencoded({
    extended: true
}));

// default response
app.get('/', function (req, res) {
  res.send('Hello World\n');
});

// Allow http access to directory /public
var serveStatic = require('serve-static')
app.use(serveStatic(__dirname + '/public', {'index': ['index.html']}))

//create node.js http server and listen on port
app.listen(PORT);

//Martin's part
//set variables
var x1 = 0;
var x2 = 0;
var baist = 1;
var baistweight = -30;
var x1weight = 20;
var x2weight = 20;
var result = 0;

//get data from formular
app.post('/and', function(request,response) {
  x1 = parseInt(request.body.x1);
  x2 = parseInt(request.body.x2);
  result = baistweight + x1weight * x1 + x2weight * x2;
  if(result < 0) {
    result = 0;
  }
  else{
    result = 1;
  }
  //send result
  response.send("Result is: "+result);

});
app.post('/myaction2', function(request, response){
    console.log(request.body.user.name);
    console.log(request.body.user.email);
});






console.log('Running on http://localhost:' + PORT);

