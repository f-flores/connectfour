// ===================================
//
// server.js
//
// ===================================

// Dependencies
// ========================================
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const MongoStore = require("connect-mongo")(session);
const routes = require("./routes");
const mongoose = require("mongoose");
const logger = require("morgan");
const	fs = require("fs");
const path = require("path");
const db = require("./models");


const PORT = process.env.PORT || 3001;
const MONGODB_LOCATION = process.env.MONGODB_URI || "mongodb://localhost/connectfour";



// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

async function createServer() {
  // Setup Express App
  // ===================================
  const app = express();

  // =======================================================================
  // MIDDLEWARE
  // =======================================================================
  // Use morgan logger for logging requests
  var accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
    "flags": "a"
  });

  //  Have morgan output to access.log file and to console
  app.use(logger("common", {
    "stream": accessLogStream
  }));
  app.use(logger("dev"));

  // body parser middleware
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  //use sessions for tracking logins
  app.use(session({
    secret: "The quick brown fox jumps over a lazy dog",
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      url: MONGODB_LOCATION
    })
  }));

  // \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // Serve Static Assets On Live (e.g.  Heroku)
  // =============================================================
  if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
  }

  // Add Database
  // =============================================================
  // mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/connectfour", { useNewUrlParser: true });


  // Setup socket.io
  // =============================================================
  var server = require("http").createServer(app);
  var io = require("socket.io")(server);

  try {
    await db.connect(io);
  } catch (error) {
    console.error(error.message);
    console.error('Closing server');
    process.exit(1);
  }

    // API Routes
  // =============================================================
  app.use(routes);

  // Send All Requests To React App
  // =============================================================
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
  });

  // Start the server
  server.listen(PORT, function() {
    console.log(`🌎  ==> Server now listening on PORT ${PORT}!`);
  });
}

createServer();
