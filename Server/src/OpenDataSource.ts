/// <reference path="../typings/sqlite3/sqlite3.d.ts"/>

import { Database } from 'sqlite3';

export class OpenDataSource {

    private db: Database;

    private static instance: OpenDataSource = new OpenDataSource();

    constructor() {
        if (OpenDataSource.instance) {
            throw new Error("Not available for singletons!");
        }
        OpenDataSource.instance = this;
    }
    public static getInstance(): OpenDataSource {
        return OpenDataSource.instance;
    }
    public getOpenDatabase(): Database {
        return this.db;
    }
    public initOpenDataBase() {
        var fs = require("fs");
        var file = 'OpenQuestions.db';
        var exists = fs.existsSync(file);

        var sqlite3 = require("sqlite3");
        var opendb = new sqlite3.Database(file);

        opendb.serialize(function() {
            if (!exists) {
                opendb.run("CREATE TABLE openQuestions(questionID INTEGER PRIMARY KEY, subjectID INTEGER, question TEXT, correctAnswer TEXT);");
                opendb.run("INSERT INTO openQuestions VALUES (1,1, 'Was ist 1+1', '2');");
                opendb.run("INSERT INTO openQuestions VALUES (2,2, 'Was ist Schule auf englisch?','school');");
                opendb.run("INSERT INTO openQuestions VALUES (3,1, 'Was ist 3*3', '9');");
            }
        });
    }
}
