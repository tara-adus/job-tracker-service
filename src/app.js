const http = require('http');
const url = require("url");

const hostname = '127.0.0.1';
const port = 3000;

const {MongoClient} = require('mongodb');

// create the HTTP server
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Headers', 'accept, content-type');
  res.setHeader('Access-Control-Allow-Methods', 'HEAD, DELETE, POST, GET, OPTIONS, PUT, PATCH');

  // Parse the request url
  const reqUrl = url.parse(req.url).pathname
  console.log("in backend")

  // Compare our request method
  if (req.method == "GET") {
      if (reqUrl == "/") {
        res.write("base url - no action taken")
        res.end()
      }else if (reqUrl == "/applications"){
        console.log("retrieving all job applications...")
        res.setHeader('Content-Type', 'application/json');
        getJobApplications().then(results => {
          res.write(JSON.stringify(results));
          res.end();
        }).catch(e => {
          console.log("error = " + e);
          res.write("error = " + e);
          res.end();
        })
      }
      else {
        res.write("invalid path")
        res.end()
      }
  } else if (req.method == "POST") {
    console.log("at post")
    if (reqUrl == "/") {
      res.write("base url - no action taken")
      res.end()
    }else if (reqUrl == "/application") {
        /* let body = req.body;
        console.log(req);
        res.write("add job application")
        res.end() */

        let body = '';
        req.on('data', chunk => {
          body += chunk.toString(); // convert Buffer to string
        });
        req.on('end', () => {
          console.log(body);
          /* TODO do the then thing */
          addJobApplication(body);
          res.end('ok');
        });

      }else {
        res.write("invalid path")
        res.end()
      }
  }else if (req.method == 'OPTIONS') {
    console.log("at options")
    res.end()
  }
}
);

async function getJobApplications(){
  const client = new MongoClient("mongodb://localhost:27017");
  try{
    await client.connect();
    const cursor = await client.db("job_tracker").collection("job_applications").find();
    const results = await cursor.toArray();
    results.forEach((result) => { 
      console.log(`jobApplication Info: _id: ${result._id} - ${result.jobId} - ${result.cname}`);
    })
    return results;
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

async function addJobApplication(jobApplicationInfo){
  let jobAppDocument = JSON.parse(jobApplicationInfo);
  const client = new MongoClient("mongodb://localhost:27017");
  try{
    /* right-click on Mongodb Compass and select “copy connection info" and use that the connect string here */
    await client.connect();
    await  listDatabases(client);
    // await addJobApplicationToMongoDB(client, jobAppDocument);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

async function listDatabases(client){
  databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

async function addJobApplicationToMongoDB(client, newJobApplication){
  const result = await client.db("job_tracker").collection("job_applications").insertOne(newJobApplication);
  console.log(`New job application created with the following id: ${result.insertedId}`);
}

//make the server listen on a port
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
