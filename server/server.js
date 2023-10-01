const express = require('express');
const cors = require('cors');
const Logger = require('./logger');
const Storage = require('./storage/storage');
const pool = require('./storage/pool');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

// Setting up CORS with allowed cookies
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
// Parse cookies
app.use(cookieParser());
// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// Parse application/json
app.use(bodyParser.json());


// Creating a Logger instance
const log = new Logger('DEBUG');
// Connecting to postgreSQL db
const storage = new Storage(pool);

//Aplying routes from /routes/index.js
require("./routes")(app, storage, log);

// Starting server
app.listen(3000, () => {
    log.infoMsg("server.js", "Server is listening", "Port: 3000");
});
