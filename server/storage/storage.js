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

  //grabs all posts from posts table
  // getAllPosts() {
  //   return new Promise(async (resolve, reject) => {
  //     const client = await this.pool.connect();
  //     await client.query("SELECT * FROM posts", (err, res) => {
  //       if(err) {
  //         reject(err);
  //       } else {
  //         resolve(res);
  //       }
  //     });
  //     await client.release();
  //   })
  // }
  //grabs all posts from posts table and finds the username of the author of each post from its' id and adds it to the post object
  getAllPosts() {
    return new Promise(async (resolve, reject) => {
      const client = await this.pool.connect();
      await client.query("SELECT * FROM posts", async (err, res) => {
        if (err) {
          reject(err);
        } else {
          let posts = res.rows;
          for (let i = 0; i < posts.length; i++) {
            try {
              const author = await this.findUser(posts[i].author_id);
              posts[i].author = author.rows[0].username;
            } catch (err) {
              reject(err);
            }
          }
          resolve(posts);
        }
        await client.release();
      });
    });
  }

  //adds a post to the posts table
  addPost(title, content, authorID) {
    return new Promise(async (resolve, reject) => {
      const client = await this.pool.connect();
      await client.query("INSERT INTO posts (title, content, author_id) VALUES ($1, $2, $3)", [title, content, authorID], (err, res) => {
        if(err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
      await client.release();
    });
  }

  //finds a user by it's id
  findUser(user_id) {
    return new Promise(async (resolve, reject) => {
      const client = await this.pool.connect();
      await client.query("SELECT * FROM accounts WHERE id = $1", [user_id], (err, res) => {
        if(err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
      await client.release();
    });
  }

  findAuthor(author_id) {
    const client = this.pool.connect();
    client.query("SELECT * FROM accounts WHERE id = $1", [author_id], (err, res) => {
      if(err) {
        console.log(err);
      } else {
        return res;
      }
    });
  }
}

module.exports = Storage;