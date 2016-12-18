/// <reference path="../typings/sqlite3/sqlite3.d.ts"/>

import { Database } from 'sqlite3';

export class SubjectDataSource {

    private db: Database;

    private static instance: SubjectDataSource = new SubjectDataSource();

    constructor() {
        if (SubjectDataSource.instance) {
            throw new Error("Not available for singletons!");
        }
        SubjectDataSource.instance = this;
    }
    public static getInstance(): SubjectDataSource {
        return SubjectDataSource.instance;
    }
    public getSubjectDataBase(): Database {
        return this.db;
    }
    public initSubjectDataBase() {
        var fs = require("fs");
        var file = 'Subjects.db';
        var exists = fs.existsSync(file);

        var sqlite3 = require("sqlite3");
        var subdb = new sqlite3.Database(file);

        subdb.serialize(function() {
            if (!exists) {
                subdb.run("CREATE TABLE Subjects(subjectID INTEGER PRIMARY KEY, SUBJECT TEXT);");
                subdb.run("INSERT INTO Subjects VALUES (1, 'Mathe');");
                subdb.run("INSERT INTO Subjects VALUES (2, 'Englisch');");
                subdb.run("INSERT INTO Subjects VALUES (3, 'Latein');");
            }
        });
    }

}
