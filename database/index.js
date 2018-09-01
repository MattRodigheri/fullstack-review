const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
    id: Number
  , name: String
  //, owner.html_url: String
  , forks: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repoObj, callback) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB

  //takes schema key info
  //creates new instance of Repo
  // repoObj = new Repo({
  //     id: repoObj.id
  //   , name: repoObj.dsname
  //   , html_url: repoObj.html_url
  //   , forks: repoObj.forks
  // });

  Repo.insertMany(repoObj, function(err) {
    if (err) {
      console.log(err);
    }
  });






  //calls save method to insert into database
  // repoObj.save(function (err, repo) {
  //   if (err) {
  //     //callback must be applied
  //     callback(err)
  //   } else {
  //     console.log('data saved!');
  //     //callback must be applied, error is skipped but callback is still invoked on success case
  //     callback();
  //   }
  // });
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
//obtain();

module.exports.obtain = obtain;
module.exports.save = save;
