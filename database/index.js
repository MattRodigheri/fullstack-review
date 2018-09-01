const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
    id: Number
  , name: String
  , forks: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repoObj, callback) => {
  // TODO: Your code here
  // This function should save a repo or repos to the MongoDB
  Repo.insertMany(repoObj, function(err) {
    if (err) {
      console.log(err);
    }
  });
}

//retrieves info from database
let obtain = (callback) => {
  Repo.find(function (err, repo) {
    if (err) {
      callback(err);
    } else {
      callback(null, repo);
    }
  })
}
//obtain()

module.exports.obtain = obtain;
module.exports.save = save;
