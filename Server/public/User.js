"use strict";
class User {
    constructor(id, uName, uPassword) {
        this.id = id;
        this.uName = uName;
        this.uPassword = uPassword;
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
}
exports.User = User;
