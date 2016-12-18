"use strict";
class MultipleDataSource {
    constructor() {
        if (MultipleDataSource.instance) {
            throw new Error("Not available for singletons!");
        }
        MultipleDataSource.instance = this;
    }
    static getInstance() {
        return MultipleDataSource.instance;
    }
    getMultipleDatabase() {
        return this.db;
    }
    initMultipleDataBase() {
        var fs = require("fs");
        var file = 'MultipleQuestions.db';
        var exists = fs.existsSync(file);
        var sqlite3 = require("sqlite3");
        var multdb = new sqlite3.Database(file);
        multdb.serialize(function () {
            if (!exists) {
                multdb.run("CREATE TABLE MultipleQuestions (questionID INTEGER PRIMARY KEY, " +
                    "subjectID INTEGER," +
                    "question TEXT, " +
                    "answerA TEXT, " +
                    "answerB TEXT, " +
                    "answerC TEXT, " +
                    "answerD TEXT, " +
                    "correctAnswer INTEGER);");
                multdb.run("INSERT INTO MultipleQuestions VALUES (1, 1, 'Wie berechnet man die Nullstellen einer Parabel?', 'Mitternachstformel'," +
                    "'Mittagsformel', 'Morgenformel', 'gar nicht', 1)");
                multdb.run("INSERT INTO MultipleQuestions VALUES (2, 2, 'Wie schreibt man Klempner auf englisch?', 'plummer', 'plumer', 'plumber'," +
                    "'plumma', 3)");
            }
        });
    }
}
MultipleDataSource.instance = new MultipleDataSource();
exports.MultipleDataSource = MultipleDataSource;
