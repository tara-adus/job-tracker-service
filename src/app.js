const http = require('http');
const url = require("url");

const hostname = '127.0.0.1';
const port = 3000;

// create the HTTP server
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  
  // Parse the request url
  const reqUrl = url.parse(req.url).pathname
  // Compare our request method
  if (req.method == "GET") {
      if (reqUrl == "/") {
        res.write("base url - no action taken")
        res.end()
      }else if (reqUrl == "/applications"){
        res.write("retrieving all job application...")
        res.end()
      }
      else {
        res.write("invalid path")
        res.end()
      }
  } else if (req.method == "POST") {
    if (reqUrl == "/") {
      res.write("base url - no action taken")
      res.end()
    }else if (reqUrl == "/application") {
        res.write("add job application")
        res.end()
      }else {
        res.write("invalid path")
        res.end()
      }
  }
});

//make the server listen on a port
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
