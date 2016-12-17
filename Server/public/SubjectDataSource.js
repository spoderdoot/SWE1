"use strict";
const sqlite3_1 = require("sqlite3");
class SubjectDataSource {
    constructor() {
        if (SubjectDataSource.instance) {
            throw new Error("Not available for singletons!");
        }
        SubjectDataSource.instance = this;
        this.db = new sqlite3_1.Database('subjects.db');
    }
    static getInstance() {
        return SubjectDataSource.instance;
    }
    getSubjectDataBase() {
        return this.db;
    }
    initSubjectDataBase() {
        var fs = require("fs");
        var file = "subjects.db";
        var exists = fs.existsSync(file);
        var sqlite3 = require("sqlite3");
        var subdb = new sqlite3.Database(file);
        subdb.serialize(function () {
            if (!exists) {
                subdb.run("CREATE TABLE subjects(subjectID INTEGER PRIMARY KEY, subject TEXT)");
                subdb.run("INSERT INTO subjects VALUES (1, 'Mathe')");
                subdb.run("INSERT INTO subjects VALUES (2, 'Englisch')");
                subdb.run("INSERT INTO subjects VALUES (3, 'Latein')");
            }
        });
    }
}
SubjectDataSource.instance = new SubjectDataSource();
exports.SubjectDataSource = SubjectDataSource;
