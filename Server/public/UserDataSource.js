"use strict";
const sqlite3_1 = require("sqlite3");
class UserDataSource {
    constructor() {
        var fs = require("fs");
        var file = 'Users.db';
        var exists = fs.existsSync(file);
        if (UserDataSource.instance) {
            throw new Error("Not available for singletons!");
        }
        if (exists) {
            UserDataSource.instance = this;
            this.db = new sqlite3_1.Database('./Users.db');
        }
        else {
            this.initUserDataBase();
            UserDataSource.instance = this;
            this.db = new sqlite3_1.Database('./Users.db');
        }
    }
    static getInstance() {
        return UserDataSource.instance;
    }
    getUserDataBase() {
        return this.db;
    }
    initUserDataBase() {
        var file = 'Users.db';
        var sqlite3 = require("sqlite3");
        var userdb = new sqlite3.Database(file);
        userdb.serialize(function () {
            userdb.run("CREATE TABLE Users(id INTEGER PRIMARY KEY, username TEXT UNIQUE, password TEXT, isTeacher TEXT);");
            userdb.run("INSERT INTO Users VALUES (1, 'Emil', 'passwort1', 'false');");
            userdb.run("INSERT INTO Users VALUES (2, 'Timo', 'admin123', 'true');");
        });
    }
}
UserDataSource.instance = new UserDataSource();
exports.UserDataSource = UserDataSource;
