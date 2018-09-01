const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
    id: {type: Number, unique: true}
  , name: String
  , forks: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repoObj, callback) => {

  var data = JSON.parse(repoObj.body);
  for (var i = 0; i < data.length; i++) {
    var obj = {id: data[i].id, name: data[i].name, forks: data[i].forks}
    var repo = new Repo(obj);
    repo.save(function(err) {
      if (err) {
        console.log(err);
      }
    });
  }
}

//retrieves info from database
let obtain = (callback) => {
  Repo.find(function (err, repo) {
    if (err) {
      callback(err);
    } else {
      callback(null, repo);
    }
  }).
  limit(25).
  sort({ forks: -1 })
}

module.exports.obtain = obtain;
module.exports.save = save;
