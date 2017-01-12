/// <reference path="../typings/sqlite3/sqlite3.d.ts"/>

import { Database } from 'sqlite3';

/**
 * This class initializes the database for the users by creating the
 * file if it does not exist and fills it with standard users
 *
 * @author Fernando Francisco Pfennig
 */
export class UserDataSource {

    // An attribute of the type Database
    private db: Database;

    // A new instance of te UserDataSource
    private static instance: UserDataSource = new UserDataSource();

    // This constructor checks if a database called 'Users.db' already exists and
    // creates the file if it does not exist
    constructor() {
        var fs = require("fs");
        var file = 'Users.db';
        var exists = fs.existsSync(file);

        if (UserDataSource.instance) {
            throw new Error("Not available for singletons!");
        }
        if (exists) {
            UserDataSource.instance = this;
            this.db = new Database('./Users.db');
        } else {
            this.initUserDataBase();
            UserDataSource.instance = this;
            this.db = new Database('./Users.db');
        }
    }

    // Returns the instance of the UserDataSource
    public static getInstance(): UserDataSource {
        return UserDataSource.instance;
    }
    // Returns the database
    public getUserDataBase() {
        return this.db;
    }
    // Initializes a new database called 'Users.db' and fills it with two standard users
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
