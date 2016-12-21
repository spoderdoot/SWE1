/// <reference path="../typings/sqlite3/sqlite3.d.ts"/>

import { Database } from 'sqlite3';

export class UserDataSource {

    private db: Database;

    private static instance: UserDataSource = new UserDataSource();

    constructor() {
        if (UserDataSource.instance) {
            throw new Error("Not available for singletons!");
        }
        UserDataSource.instance = this;
        this.db = new Database('./Users.db');
    }

    public static getInstance(): UserDataSource {
        return UserDataSource.instance;
    }
    public getUserDataBase() {
        return this.db;
    }
    public initUserDataBase() {
        var fs = require("fs");
        var file = 'Users.db';
        var exists = fs.existsSync(file);

        var sqlite3 = require("sqlite3");
        var userdb = new sqlite3.Database(file);

        userdb.serialize(function() {
            if (!exists) {
                userdb.run("CREATE TABLE Users(userID INTEGER PRIMARY KEY, userName TEXT UNIQUE, userPassword TEXT);");
                userdb.run("INSERT INTO Users VALUES (1, 'Emil', 'passwort1');");
            }
        })
    }
}
