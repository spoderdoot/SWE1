"use strict";
class UserDataSource {
    constructor() {
        if (UserDataSource.instance) {
            throw new Error("Not available for singletons!");
        }
        UserDataSource.instance = this;
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
                userdb.run("CREATE TABLE Users(userID INTEGER PRIMARY KEY, userName TEXT UNIQUE, userPassword TEXT);");
                userdb.run("INSERT INTO Users VALUES (1, 'Emil', 'passwort1');");
            }
        });
    }
}
UserDataSource.instance = new UserDataSource();
exports.UserDataSource = UserDataSource;
