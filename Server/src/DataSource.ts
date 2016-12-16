 /// <reference path="../typings/sqlite3/sqlite3.d.ts" />

 import {Database} from 'sqlite3';

 export class DataSource {

   private _db : Database;

   private db1: Database; //Questions
   private db2: Database; //Subjects

   private static _instance : DataSource = new DataSource();

   private createQuestionTable : string = "CREATE TABLE TB_QUESTIONS (" +
                                          "id integer primary key, " +
                                          "question TEXT, " +
                                          "answerA TEXT, " +
                                          "answerB TEXT, " +
                                          "answerC TEXT, " +
                                          "answerD TEXT, " +
                                          "correctAnswer INT " +
                                          ");";
   private insertQ1 : string = "INSERT INTO TB_QUESTIONS VALUES (NULL, 'In which town are you taken by GNR?', 'Sin City', 'Salt Lake City', 'Paradise City', 'Munich City', 3)";
   private insertQ2 : string = "INSERT INTO TB_QUESTIONS VALUES (NULL, 'Which song is not from AC/DC?', 'TNT', 'Highway to Hell', 'For Those About to Rock', 'Livin On a Prayer', 4)";

   constructor() {
        if(DataSource._instance) {
            throw new Error("Not available for singletons!");
        }
        DataSource._instance = this;
        this._db = new Database(':memory:');
        //this.db1 = new Database('Questions.db');
        //this.db2 = new Database('Subjects.db');
    }

    public static getInstance() : DataSource {
        return DataSource._instance;
    }

    public getDatabase() : Database {
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
    public initRest(){
            var fs = require("fs");
            var file1 = "Questions.db";
            var exists1 = fs.existsSync(file1);
            var file2 = "Subjects.db";
            var exists2 = fs.existsSync(file2);

            var sqlite3 = require("sqlite3");
            var db1 = new sqlite3.Database(file1);
            var db2 = new sqlite3.Database(file2);

            db1.serialize(function() {
                if (!exists1) {
                    db1 = db1.run("CREATE TABLE Questions(questionID INTEGER PRIMARY KEY, " + //Primary key of the questions table
                        "subject VARCHAR NOT NULL, " +        //Subject of the question
                        "question VARCHAR NOT NULL, " +       //the question itself
                        "ANSWERA VARCHAR NOT NULL, " +        //first answer
                        "ANSWERB VARCHAR NOT NULL, " +        //second answer
                        "ANSWERC VARCHAR NOT NULL, " +        //third answer
                        "ANSWERD VARCHAR NOT NULL, " +        //fourth answer
                        "CORRECTANSWER INTEGER NOT NULL, " +  //the right answer
                        "ISOPENQUESTION VARCHAR NOT NULL;");
                    db1.run("INSERT INTO multQuestions VALUES (1,'test Subject', 'In which town are you taken by GNR?', 'Sin City', 'Salt Lake City', 'Paradise City', 'Munich City', 3, 'N')");
                    db1.run("INSERT INTO multQuestions VALUES (2,'English', 'Where is Munich?', 'Texas','France','Spain','Germany', 4, 'N')");
                  }
                });

            db2.serialize(function() {
                if (!exists2) {
                    db2 = db2.run("CREATE TABLE Subjects (subjectID INTEGER PRIMARY KEY, subjectName VARCHAR NOT NULL)");
                    db2.run("INSERT INTO subjects VALUES (1, 'Mathe')");
                    db2.run("INSERT INTO subjects VALUES (2, 'Englisch')");
                    db2.run("INSERT INTO subjects VALUES (3, 'Latein')");
                  }
                });
              }
 }
