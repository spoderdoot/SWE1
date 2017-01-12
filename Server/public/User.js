"use strict";
class User {
    constructor(id, username, password, isTeacher) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.isTeacher = isTeacher;
    }
    get getUserID() {
        return this.id;
    }
    get getUserName() {
        return this.username;
    }
    get getUserPassword() {
        return this.password;
    }
    get getIsTeacher() {
        return this.isTeacher;
    }
}
exports.User = User;
