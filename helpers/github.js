const request = require('request');
const config = require('../config.js');
const dbMethods = require('../database/index.js');

let getReposByUsername = (userName, callback) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API
  let options = {
    url: `https://api.github.com/users/${userName}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  //module equal to ajax request
  //async callback pattern
  request(options, function(error, data) {
    if (error) {
      callback(error);
    } else {
      callback(null, data);
    }
  })
}


module.exports.getReposByUsername = getReposByUsername;
