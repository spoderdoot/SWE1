"use strict";
const sqlite3_1 = require("sqlite3");
class DataSource {
    constructor() {
        this.createQuestionTable = "CREATE TABLE TB_QUESTIONS (" +
            "id integer primary key, " +
            "question TEXT, " +
            "answerA TEXT, " +
            "answerB TEXT, " +
            "answerC TEXT, " +
            "answerD TEXT, " +
            "correctAnswer INT " +
            ");";
        this.insertQ1 = "INSERT INTO TB_QUESTIONS VALUES (NULL, 'In which town are you taken by GNR?', 'Sin City', 'Salt Lake City', 'Paradise City', 'Munich City', 3)";
        this.insertQ2 = "INSERT INTO TB_QUESTIONS VALUES (NULL, 'Which song is not from AC/DC?', 'TNT', 'Highway to Hell', 'For Those About to Rock', 'Livin On a Prayer', 4)";
        if (DataSource._instance) {
            throw new Error("Not available for singletons!");
        }
        DataSource._instance = this;
        this._db = new sqlite3_1.Database(':memory:');
    }
    static getInstance() {
        return DataSource._instance;
    }
    getDatabase() {
        return this._db;
    }
    initDatabase() {
        var db = this._db;
        var table = this.createQuestionTable;
        var q1 = this.insertQ1;
        var q2 = this.insertQ2;
        db.serialize(function () {
            db.run(table);
            db.run(q1);
            db.run(q2);
            var fs = require("fs");
            var file1 = "Questions.db";
            var exists1 = fs.existsSync(file1);
            var file2 = "Subjects.db";
            var exists2 = fs.existsSync(file2);
            var sqlite3 = require("sqlite3");
            var db1 = new sqlite3.Database(file1);
            var db2 = new sqlite3.Database(file2);
            db1.serialize(function () {
                if (!exists1) {
                    db1.run("CREATE TABLE multQuestions(questionID INTEGER PRIMARY KEY, " +
                        "subject VARCHAR NOT NULL, " +
                        "question VARCHAR NOT NULL, " +
                        "ANSWERA VARCHAR NOT NULL, " +
                        "ANSWERB VARCHAR NOT NULL, " +
                        "ANSWERC VARCHAR NOT NULL, " +
                        "ANSWERD VARCHAR NOT NULL, " +
                        "CORRECTANSWER INTEGER NOT NULL, " +
                        "ISOPENQUESTION VARCHAR NOT NULL");
                    db1.run("INSERT INTO multQuestions VALUES (1,'test Subject', 'In which town are you taken by GNR?', 'Sin City', 'Salt Lake City', 'Paradise City', 'Munich City', 3)");
                    db1.run("INSERT INTO multQuestions VALUES (2,'English', 'Where is Munich?', 'Texas','France','Spain','Germany',4)");
                }
            });
            db2.serialize(function () {
                if (!exists2) {
                    db2 = db2.run("CREATE TABLE subjects (subjectID INTEGER PRIMARY KEY, subjectName VARCHAR NOT NULL)");
                    db2.run("INSERT INTO subjects VALUES (1, 'Mathe')");
                    db2.run("INSERT INTO subjects VALUES (2, 'Englisch')");
                    db2.run("INSERT INTO subjects VALUES (3, 'Latein')");
                }
            });
        });
    }
}
DataSource._instance = new DataSource();
exports.DataSource = DataSource;
