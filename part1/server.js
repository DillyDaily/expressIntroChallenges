var express = require('express');
var app = express();
var port = process.env.PORT || 8000;
var fs = require('fs');
var http = require('http');
var path = require("path");

//1
app.get('/hello', function(req, res) {
  res.send("Hello!");
});
//2
app.post('/create/:name/:id', function(req, res) {
  let obj = {
    name: req.params.name, 
    id: req.params.id
  };
  res.json(obj);
})
//3
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+"/index.html"))
});

//4
app.get('/verify/:age', function(req, res) {
  let age = parseInt(req.params.age);
  if (age >=13){
    res.sendStatus(200);
  }else{
    res.sendStatus(403);
    }
  });

app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});
