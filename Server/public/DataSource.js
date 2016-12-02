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
        });
    }
}
exports.DataSource = DataSource;
DataSource._instance = new DataSource();
