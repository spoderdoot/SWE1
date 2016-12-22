"use strict";
class User {
    constructor(id, username, uPassword, isTeacher) {
        this.id = id;
        this.username = username;
        this.uPassword = uPassword;
        this.isTeacher = isTeacher;
    }
    ;
    get getUserID() {
        return this.id;
    }
    set setUserID(newID) {
        this.id = newID;
    }
    get getUserName() {
        return this.username;
    }
    get getUserPassword() {
        return this.uPassword;
    }
    get getIsTeacher() {
        return this.isTeacher;
    }
}
exports.User = User;
