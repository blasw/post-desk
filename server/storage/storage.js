class Storage {
  constructor(pool) {
    this.pool = pool;
  }

  //grabs all users from accounts table
  getAllUsers() {
    return new Promise( async(resolve, reject) => {
      const client = await this.pool.connect();
      await client.query("SELECT * FROM accounts", (err, res) => {
        if(err) {
          reject(err);
        } else {
          resolve(res.rows);
        }
      });
      await client.release();
    });
  }

  //adds user with username, email, and password to accounts table
  addUser(username, email, password) {
      return new Promise(async (resolve, reject) => {
          const client = await this.pool.connect();
          await client.query("INSERT INTO accounts (username, email, password) VALUES ($1, $2, $3)", [username, email, password], (err, res) => {
              if (err){
                reject(err);
              } else {
                resolve(res);
              }
            });
          await client.release();
      })
  }


}

module.exports = Storage;