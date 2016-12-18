"use strict";
const sqlite3_1 = require("sqlite3");
class OpenDataSource {
    constructor() {
        if (OpenDataSource.instance) {
            throw new Error("Not available for singletons!");
        }
        OpenDataSource.instance = this;
        this.db = new sqlite3_1.Database('openQuestions.db');
    }
    static getInstance() {
        return OpenDataSource.instance;
    }
    getOpenDatabase() {
        return this.db;
    }
    initOpenDataBase() {
        var fs = require("fs");
        var file = "openQuestions.db";
        var exists = fs.existsSync(file);
        var sqlite3 = require("sqlite3");
        var opendb = new sqlite3.Database(file);
        opendb.serialize(function () {
            if (!exists) {
                opendb.run("CREATE TABLE openQuestions(questionID INTEGER PRIMARY KEY, " +
                    "SUBJECT INTEGER, " +
                    "QUESTION TEXT, " +
                    "CORRECTANSWER TEXT)");
                opendb.run("INSERT INTO openQuestions VALUES (1,1, 'Was ist 1+1', '2')");
                opendb.run("INSERT INTO openQuestions VALUES (2,2, 'Was ist Schule auf englisch?','school')");
                opendb.run("INSERT INTO openQuestions VALUES (3,1, 'Was ist 3*3', '9')");
            }
        });
    }
}
exports.OpenDataSource = OpenDataSource;
OpenDataSource.instance = new OpenDataSource();
