"use strict";
const sqlite3_1 = require("sqlite3");
class UserDataSource {
    constructor() {
        if (UserDataSource.instance) {
            throw new Error("Not available for singletons!");
        }
        UserDataSource.instance = this;
        this.db = new sqlite3_1.Database('./Users.db');
    }
    static getInstance() {
        return UserDataSource.instance;
    }
    getUserDataBase() {
        return this.db;
    }
    initUserDataBase() {
        var fs = require("fs");
        var file = 'Users.db';
        var exists = fs.existsSync(file);
        var sqlite3 = require("sqlite3");
        var userdb = new sqlite3.Database(file);
        userdb.serialize(function () {
            if (!exists) {
                userdb.run("CREATE TABLE Users(id INTEGER PRIMARY KEY, username TEXT UNIQUE, userpassword TEXT, isTeacher TEXT);");
                userdb.run("INSERT INTO Users VALUES (1, 'Emil', 'passwort1', 'false');");
                userdb.run("INSERT INTO Users VALUES (2, 'Timo', 'admin123', 'true');");
            }
        });
    }
}
UserDataSource.instance = new UserDataSource();
exports.UserDataSource = UserDataSource;
