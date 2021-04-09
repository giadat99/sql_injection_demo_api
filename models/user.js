const db = require('../helpers/database');

module.exports = class User {
    constructor(username, email, password, name) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.name = name;
    }

    save() {
        return db.execute(`INSERT INTO users (username, password, email, name) VALUES ('${this.username}', '${this.password}', '${this.email}', '${this.name}')`);
    }

    static login(username , password) {
        return db.execute(`SELECT * FROM users WHERE username='${username}' AND password='${password}'`)
    }
}