/*var http = require("http");

var requestOptions = {
  host: "example.com",
  path: "/"
};

function readHTML (url, callback) {
  http.get(requestOptions, (response) => {

  response.setEncoding("utf8");

  response.on("data", function(data) {
     //console.log("Chunk Received. Length:", data.length);
     callback(data);
  });

   //response.on("end", function() {
     //console.log("Response stream complete.");
   //});

  });
}
function printHTML (htmlData) {
  console.log(htmlData);

 }

readHTML("http://www.example.com", printHTML);
*/

var request = require("request");

function readHTML (url, callback) {
  request(url, function(err, response, body)  {
    if (err) {
      throw err;
    }
    callback(body);
  });
}
function printHTML (htmlData) {
  console.log(htmlData)

}
  //console.log("Response Status Code:");
readHTML('http://www.example.com', printHTML);