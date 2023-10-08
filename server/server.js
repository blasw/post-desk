const express = require('express');
const cors = require('cors');
const Logger = require('./logger');
const Storage = require('./storage/storage');
const pool = require('./storage/pool');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require ('dotenv').config();

const app = express();

//Setting up CORS with allowed cookies on dev server
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

//on deploy
// app.use(express.static("../client/dist"));


// Creating a Logger instance
const log = new Logger('DEBUG');
// Connecting to postgreSQL db
const storage = new Storage(pool);

//Aplying routes from /routes/index.js
require("./routes")(app, storage, log);

// Starting server
app.listen(process.env.SERVER_PORT, () => {
    log.infoMsg("server.js", "Server is listening", `Port: ${process.env.SERVER_PORT}`);
});
