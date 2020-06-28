// Reading Environment variables
require("dotenv").config();

// importing the server application
const app = require("./app");

// importing databaes connection
require("./database");

// testing the AWS credentials
require("./aws");

// starting the server on a HTTP Port
app.listen(app.get("port"));

console.log("Server on port 3000");
