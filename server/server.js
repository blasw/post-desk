const express = require('express');
const cors = require('cors');
const Logger = require('./logger');
const Storage = require('./storage/storage');
const pool = require('./storage/pool');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// Parse application/json
app.use(bodyParser.json());

const log = new Logger('DEBUG');
const storage = new Storage(pool);

require("./routes")(app, storage, log);

app.listen(3000, () => {
    log.infoMsg("server.js", "Server is listening", "Port: 3000");
});
