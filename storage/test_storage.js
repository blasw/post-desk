const pool = require('./pool');

const Storage = require('./storage');

const storage = new Storage(pool);

storage.getAllUsers().then(r => console.log(r));