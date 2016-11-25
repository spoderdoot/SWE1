/**
 * Demo application WWM - Software Engineering 1 - WS 2016/17
 * University of Applied Sciences Munich
 * author: SCS
 *
 **/
 /// <reference path="../typings/sqlite3/sqlite3.d.ts" />

 import {Database} from 'sqlite3';

 export class DataSource {

   private _db : Database;
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
      });
    }

 }
