const express = require('express');
let app = express();
const dbMethods = require('../database/index.js');
const helpers = require('../helpers/github.js');
var bodyParser = require('body-parser')


app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended:true}))

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database

  //info sent back to client
  var userName = req.body.userName
  //console.log("Username: ", userName)
  helpers.getReposByUsername(userName, function(error, data) {
    if (error) {
      res.sendStatus(500)
    } else {
      res.sendStatus(201);
      // dbMethods.save(data, function(error) {
      //   if (error) {
      //     res.sendStatus(500)
      //   } else {
      //     res.sendStatus(201)
      //   }
      // });
    }
  })
  res.end()
})

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos

  dbMethods.obtain(function(error, data) {
    if (error) {
      res.send(error);
    } else {
      //sorting function
      console.log(data)
      // res.send(null, function() {
      //
      // })
    }
  })
  res.end();
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
