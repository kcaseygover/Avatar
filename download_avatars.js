var request = require('request');
var reposOwner = process.argv[2];
var reposName = process.argv[3];
var endpoint = `/repos/${reposOwner}/${reposName}/contributors`;


function githubRequest(endpoint, callback) {
  var githubRoot = "https://api.github.com";

  var options = {
    url: `${githubRoot}${endpoint}`,
    headers: {
      'User-Agent': 'request'
    }
  };


  request.get(options, callback);
}

function getGithubContributors(reposowner, reposname,  callback) {
  githubRequest(endpoint, callback);
}


getGithubContributors(reposOwner, reposName, function(error, response, body) {
  if (error) {
    console.log("Something went wrong:", error);
    return;
  }
  var contributors = JSON.parse(body);

  console.log(contributors);

  contributors.forEach(function(contributor){
    console.log(`- ${contributor.avatar_url}`);
  });
});
console.log(`Getting ${reposOwner}/${reposName}/ contributors...\n`);

