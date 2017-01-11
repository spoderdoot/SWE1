"use strict";
class LoginResult {
    constructor(userNameIsOk, passwordIsOk, isTeacher) {
        this.userNameIsOk = userNameIsOk;
        this.passwordIsOk = passwordIsOk;
        this.isTeacher = isTeacher;
    }
    get getUserNameIsOk() {
        return this.userNameIsOk;
    }
    get getPasswordIsOk() {
        return this.passwordIsOk;
    }
    get getIsTeacher() {
        return this.isTeacher;
    }
}
exports.LoginResult = LoginResult;
