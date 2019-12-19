// Import Express and external middleware
const express = require('express');
const helmet = require("helmet");

//Import custom middleware
const {defaultResponse, logger} = require('./middleware/custom');

// Import specific Routers
const carRouter = require("./cars/carRouter"); 

// Create server
const server = express();

// Use global middleware 
server.use(helmet());
server.use(express.json());
server.use(logger);

// Specify general endpoints
server.get('/', (req, res) => {
  res.send(`<h2>This is for project "webdb-ii-challenge"</h2>`);
});

// Use specific Routers
server.use("/cars", carRouter); 

server.use(defaultResponse);

module.exports = server;