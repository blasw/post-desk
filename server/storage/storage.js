
//Storage class which is used to interact with database, requires a pool(db config from pool.js) to be passed in
class Storage {
  constructor(pool) {
    this.pool = pool;
  }

  //grabs user with given username from accounts table
  getUser(username) {
    return new Promise(async (resolve, reject) => {
      const client = await this.pool.connect();
      await client.query("SELECT * FROM accounts WHERE username = $1", [username], (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res.rows[0]);
        }
      });
      await client.release();
    });
  }

  getUserStats(username) {
    return new Promise(async (resolve, reject) => {
      const client = await this.pool.connect();
      try {
        //getting base user info
        const userInfo = (await client.query("SELECT * FROM accounts WHERE username = $1", [username])).rows[0];
        delete userInfo.password;

        //getting amount of user's posts
        const postsCount = (await client.query("SELECT COUNT(*) FROM posts WHERE author_id = $1", [userInfo.id])).rows[0].count;

        //getting amount of user's likes
        const likesCount = (await client.query("SELECT COUNT(*) FROM likes WHERE user_id = $1", [userInfo.id])).rows[0].count;

        delete userInfo.id;
        userInfo.postsCount = postsCount;
        userInfo.likesCount = likesCount;

        console.log(userInfo);
        resolve(userInfo);
      } catch (err) {
        reject(err);
      } finally {
        await client.release();
      }
    });
  }

  //adds user with username, email, and password to accounts table
  addUser(username, email, password) {
    return new Promise(async (resolve, reject) => {
      const client = await this.pool.connect();
      await client.query("INSERT INTO accounts (username, email, password) VALUES ($1, $2, $3)", [username, email, password], (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
      await client.release();
    })
  }

  //Checks if user already exists in accounts table
  async userExists(username) {
    const client = await this.pool.connect();
    const res = await client.query("SELECT * FROM accounts WHERE username = $1", [username]);
    await client.release();
    return res.rows.length > 0 ? true : false;
  }

  //grabs 9 posts from posts table sorted by likes amount and finds the username of the author of each post from its' id and adds it to the post object
  getAllPosts(sortTerm = "likes_count DESC", page = 1) {
    return new Promise(async (resolve, reject) => {

      let offset = (page - 1) * 12;

      const client = await this.pool.connect();
      await client.query(`SELECT * FROM posts ORDER BY ${sortTerm} LIMIT 12 OFFSET ${offset}`, async (err, res) => {
        if (err) {
          reject(err);
        } else {
          let posts = res.rows;
          for (let i = 0; i < posts.length; i++) {
            try {
              const author = await this.#findUser(posts[i].author_id);
              posts[i].author = author.rows[0].username;
            } catch (err) {
              reject(err);
            }
          }
          resolve(posts);
        }
      });
      await client.release();
    });
  }

  #getUserLikes(user_id) {
    return new Promise(async (resolve, reject) => {
      const client = await this.pool.connect();
      await client.query("SELECT * FROM likes WHERE user_id = $1", [user_id], (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res.rows);
        }
      });
      await client.release();
    })
  }

  //overloaded getAllPosts that should be called when user is logged in, it checks if user has liked each post and adds a "like" boolean to each post object
  getAllPostsAuth(username, sortTerm = "likes_count DESC", page = 1) {
    return new Promise(async (resolve, reject) => {
      const client = await this.pool.connect();
      const user_id = (await this.getUser(username)).id;
      const user_likes = await this.#getUserLikes(user_id);
      let posts = await this.getAllPosts(sortTerm, page);
      posts = posts.map(post => ({
        ...post,
        like: user_likes.some(like => like.post_id == post.id)
      }));
      for (let i = 0; i < posts.length; i++) {
        try {
          const author = await this.#findUser(posts[i].author_id);
          posts[i].author = author.rows[0].username;
        } catch (err) {
          reject(err);
        }
      }
      resolve(posts);
      await client.release();
    });
  }

  getUserPosts(username, page = 1) {
    return new Promise(async (resolve, reject) => {
      let offset = (page - 1) * 12;

      const client = await this.pool.connect();
      const user_id = (await this.getUser(username)).id;
      const user_likes = await this.#getUserLikes(user_id);
      await client.query("SELECT * FROM posts WHERE author_id = $1 ORDER BY id DESC LIMIT 12 OFFSET $2", [user_id, offset], async (err, res) => {
        if (err) {
          reject(err);
        } else {
          let posts = res.rows;
          posts = posts.map(post => ({
            ...post,
            like: user_likes.some(like => like.post_id == post.id)
          }));
          for (let i = 0; i < posts.length; i++) {
            try {
              const author = await this.#findUser(posts[i].author_id);
              posts[i].author = author.rows[0].username;
            } catch (err) {
              reject(err);
            }
          }
          resolve(posts);
        }
      });
      await client.release();
    });
  }

  getPagesCount() {
    return new Promise(async (resolve, reject) => {
      const client = await this.pool.connect();
      await client.query("SELECT COUNT(*) FROM posts", (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(Math.ceil(res.rows[0].count / 12));
        }
      });
      await client.release();
    });
  }

  //adds a post to the posts table
  addPost(title, content, username) {
    return new Promise(async (resolve, reject) => {
      const client = await this.pool.connect();
      const user = await this.getUser(username);

      await client.query("INSERT INTO posts (title, content, author_id) VALUES ($1, $2, $3)", [title, content, user.id], (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });

      await client.release();
    });
  }

  //finds a user by it's id. Used to find author's username for each post
  #findUser(user_id) {
    return new Promise(async (resolve, reject) => {
      const client = await this.pool.connect();
      await client.query("SELECT * FROM accounts WHERE id = $1", [user_id], (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
      await client.release();
    });
  }

  //creates a like in likes table (with following user_id and post_id)
  addLike(user_id, post_id) {
    return new Promise(async (resolve, reject) => {
      const client = await this.pool.connect();
      await client.query("INSERT INTO likes (user_id, post_id) VALUES ($1, $2)", [user_id, post_id], (err, res) => {
        if (err) {
          reject(err);
        }
      });
      await client.query("UPDATE posts SET likes_count = likes_count + 1 WHERE id = $1", [post_id], (err, res) => {
        if (err) {
          reject(err);
        }
      });
      resolve(true);
      await client.release();
    });
  };

  //deletes a like from likes table (with following user_id and post_id)
  undoLike(user_id, post_id) {
    return new Promise(async (resolve, reject) => {
      const client = await this.pool.connect();
      await client.query("DELETE FROM likes WHERE user_id = $1 AND post_id = $2", [user_id, post_id], (err, res) => {
        if (err) {
          reject(err);
        }
      });
      await client.query("UPDATE posts SET likes_count = likes_count - 1 WHERE id = $1", [post_id], (err, res) => {
        if (err) {
          reject(err);
        }
      });
      resolve(true);
      await client.release();
    });
  }
}

module.exports = Storage;