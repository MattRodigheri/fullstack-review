const request = require('request');
const config = require('../config.js');
const dbMethods = require('../database/index.js');


let getReposByUsername = (userName, callback) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API
  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    url: `https://api.github.com/users/${userName}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  request(options, callback)

  function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    var info = JSON.parse(body);
    // console.log(JSON.stringify("ID:" + info[0].id));
    // console.log(JSON.stringify("Name:" + info[0].name));
    // console.log(JSON.stringify("URL:" + info[0].owner.html_url));
    // console.log(JSON.stringify("Forks:" + info[0].forks));
    //console.log(info);
    dbMethods.save(info);
  }
}

}

module.exports.getReposByUsername = getReposByUsername;
