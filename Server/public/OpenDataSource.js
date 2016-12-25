"use strict";
const sqlite3_1 = require("sqlite3");
class OpenDataSource {
    constructor() {
        if (OpenDataSource.instance) {
            throw new Error("Not available for singletons!");
        }
        OpenDataSource.instance = this;
        this.db = new sqlite3_1.Database('./OpenQuestions.db');
    }
    static getInstance() {
        return OpenDataSource.instance;
    }
    getOpenDatabase() {
        return this.db;
    }
    initOpenDataBase() {
        var fs = require("fs");
        var file = 'OpenQuestions.db';
        var exists = fs.existsSync(file);
        var sqlite3 = require("sqlite3");
        var opendb = new sqlite3.Database(file);
        opendb.serialize(function () {
            if (!exists) {
                opendb.run("CREATE TABLE OpenQuestions(id INTEGER PRIMARY KEY," +
                    "category TEXT, " +
                    "question TEXT, " +
                    "correctAnswer TEXT);");
                opendb.run("INSERT INTO openQuestions VALUES (1, 'Mathe', 'Was ist 1+1', '2');");
                opendb.run("INSERT INTO openQuestions VALUES (2, 'Englisch', 'Was ist Schule auf englisch?','school');");
                opendb.run("INSERT INTO openQuestions VALUES (3, 'Mathe', 'Was ist 3*3', '9');");
            }
        });
    }
}
exports.OpenDataSource = OpenDataSource;
OpenDataSource.instance = new OpenDataSource();
