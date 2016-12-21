"use strict";
class Teacher {
    constructor(id, tName, tPassword) {
        this.id = id;
        this.tName = tName;
        this.tPassword = tPassword;
    }
    ;
    get getTeacherID() {
        return this.id;
    }
    get getTeacherName() {
        return this.tName;
    }
    get getTeacherPassword() {
        return this.tPassword;
    }
}
exports.Teacher = Teacher;
