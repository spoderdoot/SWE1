"use strict";
class LoginResult {
    constructor(isUserNameOk, isPasswordOk, isTeacher) {
        this.isUserNameOk = isUserNameOk;
        this.isPasswordOk = isPasswordOk;
        this.isTeacher = isTeacher;
    }
    get getUserNameIsOk() {
        return this.isUserNameOk;
    }
    get getPasswordIsOk() {
        return this.isPasswordOk;
    }
    get getIsTeacher() {
        return this.isTeacher;
    }
}
exports.LoginResult = LoginResult;
