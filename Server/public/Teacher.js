"use strict";
class Teacher {
    constructor(teacherID, tName, tPassword) {
        this.teacherID = teacherID;
        this.tName = tName;
        this.tPassword = tPassword;
    }
    ;
    get getTeacherID() {
        return this.teacherID;
    }
    get getTeacherName() {
        return this.tName;
    }
    get getTeacherPassword() {
        return this.tPassword;
    }
}
exports.Teacher = Teacher;
