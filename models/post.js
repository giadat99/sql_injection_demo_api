const db = require('../helpers/database');

module.exports = class Post {
    constructor( content) {
        this.content = content;
    }

    save() {
        return db.execute(`INSERT INTO posts (content) VALUES ('${this.content}')`)
    }

    static fetchPosts() {
        return db.execute('SELECT * FROM posts')
    }

    static getPost(id) {
        return db.execute(`SELECT * FROM posts WHERE id='${id}'`)
    }

    static updatePost(id, content) {
        return db.execute(`UPDATE posts SET content='${content}' WHERE id='${id}'`)
    }

    static deletePost(id) {
        return db.execute(`DELETE FROM posts WHERE id='${id}'`)
    }
}