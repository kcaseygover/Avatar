var request = require('request');
var reposOwner = process.argv[2];
var reposName = process.argv[3];
var endpoint = `/repos/${reposOwner}/${reposName}/contributors`;
var githubRoot = "https://api.github.com";
var fs = require('fs');

function githubRequest(endpoint, callback) {
  var options = {
    url: `${githubRoot}${endpoint}`,
    headers: {
      'User-Agent': 'request'
    }
  };
  request.get(options, callback);
}

function getRepoContributors(reposowner, reposname,  callback) {
  githubRequest(endpoint, callback);
}

function downloadImageByUrl (url, filePath) {
  request.head(url, function(err, res, body){
    var fileNameExt = res.headers['content-type'].split('/').pop();

  request(url).pipe(fs.createWriteStream(`${filePath}.${fileNameExt}`));
  });
};
getRepoContributors(reposOwner, reposName, function(error, response, body) {
  if (error) {
    console.log("Something went wrong:", error);
    return;
  }
  var contributors = JSON.parse(body);
  contributors.forEach(function(contributor){
    console.log(`${contributor.avatar_url}`);
    downloadImageByUrl(contributor.avatar_url, `avatar/${contributor.login}`);
  });
});

