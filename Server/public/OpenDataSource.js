"use strict";
class OpenDataSource {
    constructor() {
        if (OpenDataSource.instance) {
            throw new Error("Not available for singletons!");
        }
        OpenDataSource.instance = this;
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
                opendb.run("CREATE TABLE openQuestions(questionID INTEGER PRIMARY KEY, subjectID INTEGER, question TEXT, correctAnswer TEXT);");
                opendb.run("INSERT INTO openQuestions VALUES (1,1, 'Was ist 1+1', '2');");
                opendb.run("INSERT INTO openQuestions VALUES (2,2, 'Was ist Schule auf englisch?','school');");
                opendb.run("INSERT INTO openQuestions VALUES (3,1, 'Was ist 3*3', '9');");
            }
        });
    }
}
OpenDataSource.instance = new OpenDataSource();
exports.OpenDataSource = OpenDataSource;
