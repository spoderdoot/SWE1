/// <reference path="../typings/sqlite3/sqlite3.d.ts" />

import {Database} from 'sqlite3';

export class DataSource {

    private _db: Database;

    private db1: Database; //multiple choice questions

    private static _instance: DataSource = new DataSource();

    private createQuestionTable: string = "CREATE TABLE TB_QUESTIONS (" +
    "id integer primary key, " +
    "question TEXT, " +
    "answerA TEXT, " +
    "answerB TEXT, " +
    "answerC TEXT, " +
    "answerD TEXT, " +
    "correctAnswer INT " +
    ");";
    private insertQ1: string = "INSERT INTO TB_QUESTIONS VALUES (NULL, 'In which town are you taken by GNR?', 'Sin City', 'Salt Lake City', 'Paradise City', 'Munich City', 3)";
    private insertQ2: string = "INSERT INTO TB_QUESTIONS VALUES (NULL, 'Which song is not from AC/DC?', 'TNT', 'Highway to Hell', 'For Those About to Rock', 'Livin On a Prayer', 4)";

    constructor() {
        if (DataSource._instance) {
            throw new Error("Not available for singletons!");
        }
        DataSource._instance = this;
        this._db = new Database(':memory:');
    }

    public static getInstance(): DataSource {
        return DataSource._instance;
    }

    public getDatabase(): Database {
        return this._db;
    }

    // set up initial database structure containing some test values
    public initDatabase() {
        var db = this._db;
        var table = this.createQuestionTable;
        var q1 = this.insertQ1;
        var q2 = this.insertQ2;

        db.serialize(function() {
            // create table
            db.run(table);
            // add initial questions
            db.run(q1);
            db.run(q2);
        })
    }
    public initRest() {
        var fs = require("fs");
        var file1 = "multQuestions.db";
        var exists1 = fs.existsSync(file1);

        var sqlite3 = require("sqlite3");
        var db1 = new sqlite3.Database(file1);

        db1.serialize(function() {
            if (!exists1) {
                db1.run("CREATE TABLE multQuestions(questionID INTEGER PRIMARY KEY, " + //ID of the question, also primary key
                    "SUBJECT INTEGER, " +        //subjectID of the question
                    "QUESTION TEXT, " +       //the question itself
                    "ANSWERA TEXT, " +        //first answer
                    "ANSWERB TEXT, " +        //second answer
                    "ANSWERC TEXT, " +        //third answer
                    "ANSWERD TEXT, " +        //fourth answer
                    "CORRECTANSWER INTEGER)"  //the right answer
                );
                db1.run("INSERT INTO multQuestions VALUES(1, 2, 'Wie schreibt man Klempner auf englisch?', 'plummer', 'plumber','plumer', 'plumba', 2)");
                db1.run("INSERT INTO multQuestions VALUES(2, 1, 'Was ist 2+2*2+2 ?','16', '10', '8', '12', 3)");
            }
        });
    }
}
