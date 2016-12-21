"use strict";
const sqlite3_1 = require("sqlite3");
class TeacherDataSource {
    constructor() {
        if (TeacherDataSource.instance) {
            throw new Error("Not available for singletons!");
        }
        TeacherDataSource.instance = this;
        this.db = new sqlite3_1.Database('./Teachers.db');
    }
    static getInstance() {
        return TeacherDataSource.instance;
    }
    getTeacherDataBase() {
        return this.db;
    }
    initTeacherDatabase() {
        var fs = require("fs");
        var file = 'Teachers.db';
        var exists = fs.existsSync(file);
        var sqlite3 = require("sqlite3");
        var teachdb = new sqlite3.Database(file);
        teachdb.serialize(function () {
            if (!exists) {
                teachdb.run("CREATE TABLE Teachers(teacherID INTEGER PRIMARY KEY, tName TEXT UNIQUE, tPassword TEXT);");
            }
        });
    }
}
TeacherDataSource.instance = new TeacherDataSource();
exports.TeacherDataSource = TeacherDataSource;
