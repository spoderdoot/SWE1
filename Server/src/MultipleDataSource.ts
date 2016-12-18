/// <reference path="../typings/sqlite3/sqlite3.d.ts"/>

import { Database } from 'sqlite3';

export class MultipleDataSource {

  private db: Database;

  private static instance: MultipleDataSource = new MultipleDataSource();

  constructor() {
    if(MultipleDataSource.instance) {
      throw new Error("Not available for singletons!");
    }
    MultipleDataSource.instance = this;
  }
public static getInstance(): MultipleDataSource {
  return MultipleDataSource.instance;
}
public getMultipleDatabase() : Database {
  return this.db;
}
public initMultipleDataBase() {
  var fs = require("fs");
  var file = 'MultipleQuestions.db';
  var exists = fs.existsSync(file);

  var sqlite3 = require("sqlite3");
  var multdb = new sqlite3.Database(file);

  multdb.serialize(function(){
    if(!exists){
      multdb.run("CREATE TABLE MultipleQuestions (" +
      "questionID INTEGER PRIMARY KEY, " +
      "subjectID INTEGER"+
      "question TEXT, " +
      "answerA TEXT, " +
      "answerB TEXT, " +
      "answerC TEXT, " +
      "answerD TEXT, " +
      "correctAnswer INTEGER " +
      ");");
      multdb.run("INSERT INTO MultipleQuestions VALUES (1, 1, 'Wie berechnet man die Nullstellen einer Parabel?', 'Mitternachstformel'," +
                 "'Mittagsformel', 'Morgenformel', 'gar nicht', 1)");
      multdb.run("INSERT INTO MultipleQuestions VALUES (2, 2, 'Wie schreibt man Klempner auf englisch?', 'plummer', 'plumer', 'plumber'," +
                 "'plumma', 3)");
    }
  })
}
}
