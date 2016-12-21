"use strict";
class User {
    constructor(id, uName, uPassword, isTeacher) {
        this.id = id;
        this.uName = uName;
        this.uPassword = uPassword;
        this.isTeacher = isTeacher;
    }
    ;
    get getUserID() {
        return this.id;
    }
    get getUserName() {
        return this.uName;
    }
    get getUserPassword() {
        return this.uPassword;
    }
    get getIsTeacher() {
        return this.isTeacher;
    }
}
exports.User = User;
