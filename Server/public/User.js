"use strict";
class User {
    constructor(userID, uName, uPassword) {
        this.userID = userID;
        this.uName = uName;
        this.uPassword = uPassword;
    }
    ;
    get getUserID() {
        return this.userID;
    }
    get getUserName() {
        return this.uName;
    }
    get getUserPassword() {
        return this.uPassword;
    }
}
exports.User = User;
