/// <reference path="../typings/sqlite3/sqlite3.d.ts"/>

import { Database } from 'sqlite3';

export class TeacherDataSource {

    private db: Database;

    private static instance: TeacherDataSource = new TeacherDataSource();

    constructor() {
        if (TeacherDataSource.instance) {
            throw new Error("Not available for singletons!");
        }
        TeacherDataSource.instance = this;
    }

    public static getInstance(): TeacherDataSource {
        return TeacherDataSource.instance;
    }
    public getTeacherDataBase(): Database {
        return this.db;
    }
    public initTeacherDatabase() {
        var fs = require("fs");
        var file = 'Teachers.db';
        var exists = fs.existsSync(file);

        var sqlite3 = require("sqlite3");
        var teachdb = new sqlite3.Database(file);

        teachdb.serialize(function() {
            if (!exists) {
                teachdb.run("CREATE TABLE Teachers(teacherID INTEGER PRIMARY KEY, tName TEXT UNIQUE, tPassword TEXT);");
                teachdb.run("INSERT INTO Teachers VALUES (1, 'Timo', 'admin123');");
            }
        })
    }
}
