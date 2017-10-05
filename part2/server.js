var express = require('express');
var app = express();
var port = process.env.PORT || 8000;
var fs = require('fs');
var path = require('path');

app.get('/yourroute', function(req, res) {
  res.send("stuff");
});
//1
  app.post('/create/:name/:age', function(req, res) {
    let obj = {
      name: req.params.name, 
      age: parseInt(req.params.age)
    };
    fs.readFile('./storage.json', 'utf8', function (err, data) {
      let usersList = JSON.parse(data);
      usersList.push(obj);

    fs.writeFile('./storage.json', JSON.stringify(usersList), function(err) {
      if (err) throw err;
      res.json(obj);
      });
    });
  });

//2
  app.get('/', function (req, res) {
    fs.readFile('./storage.json', 'utf8', function(err, data) {
      if (err) throw err;
      let currentData = JSON.parse(data);
      res.json(currentData);
    })
  });

//3
app.get('/:name', function (req, res) {
  fs.readFile('./storage.json', 'utf8', function(err, data) {
    if (err) throw err;
    let currentData = JSON.parse(data);

   for (let i = 0; i<currentData.length; i++) {
     if (currentData[i].name === req.params.name) {
       res.json(currentData[i]);
       return;
     }
   }
   res.sendStatus(404);
     });
  });

app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});
