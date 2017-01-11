/// <reference path="../typings/sqlite3/sqlite3.d.ts"/>

import { Database } from 'sqlite3';

export class UserDataSource {

    private db: Database;

    private static instance: UserDataSource = new UserDataSource();

    constructor() {
        var fs = require("fs");
        var file = 'Users.db';
        var exists = fs.existsSync(file);

        if (UserDataSource.instance) {
            throw new Error("Not available for singletons!");
        }
        if(exists) {
        UserDataSource.instance = this;
        this.db = new Database('./Users.db');
      } else {
        this.initUserDataBase();
        UserDataSource.instance = this;
        this.db = new Database('./Users.db');
      }
    }

    public static getInstance(): UserDataSource {
        return UserDataSource.instance;
    }
    public getUserDataBase() {
        return this.db;
    }
    public initUserDataBase() {

        var file = 'Users.db';
        var sqlite3 = require("sqlite3");
        var userdb = new sqlite3.Database(file);

        userdb.serialize(function() {

                userdb.run("CREATE TABLE Users(id INTEGER PRIMARY KEY, username TEXT UNIQUE, password TEXT, isTeacher TEXT);");
                userdb.run("INSERT INTO Users VALUES (1, 'Emil', 'passwort1', 'false');");
                userdb.run("INSERT INTO Users VALUES (2, 'Timo', 'admin123', 'true');");
        });
    }
}
