const express = require('express');
let app = express();
const dbMethods = require('../database/index.js');
const helpers = require('../helpers/github.js');
//var bodyParser = require('body-parser')

//app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database

  //info sent back to client
  var userName = req.body.userName
  helpers.getReposByUsername(userName, function(error, data) {
    if (error) {
      res.sendStatus(500)
    } else {
      //console.log(data) - works, logs data in terminal
      dbMethods.save(data, function(error, data) {
        if (error) {
          callback(error);
        } else {
          callback(null, data);
        }
      });
      res.sendStatus(201);
    }
  })
})

app.get('/repos', function (req, res) {
  // This route should send back the top 25 repos
  dbMethods.obtain(function(error, data) {
    if (error) {
      res.send(error);
    } else {
      res.send(data)
      //write sorting function here
    }
  })
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
