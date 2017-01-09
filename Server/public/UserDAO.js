"use strict";
const UserDataSource_1 = require("./UserDataSource");
const User_1 = require("./User");
class UserDAO {
    static getUsers(callback) {
        var users = new Array();
        this.uds.getUserDataBase().all("SELECT username,isTeacher FROM Users;", function (err, rows) {
            for (var row of rows) {
                var u1 = new User_1.User(row['id'], row['username'], row['password'], row['isTeacher']);
                users.push(u1);
            }
            callback(users);
        });
    }
    static createUser(newUser) {
        var insert = "INSERT INTO Users VALUES(NULL,'" + newUser.getUserName + "', '"
            + newUser.getUserPassword + "', 'false');";
        console.log(insert);
        return new Promise(function (resolve, reject) {
            UserDAO.uds.getUserDataBase().run(insert, function (err) {
                var isUserNameOk;
                if (err) {
                    console.log("Failed");
                    console.log(err);
                    this.isUserNameOk = "false";
                    console.log(this.isUserNameOk);
                    resolve(this.isUserNameOk);
                }
                else {
                    console.log("Success " + this.lastID);
                    this.isUserNameOk = "true";
                    resolve(this.isUserNameOk);
                }
            });
        });
    }
    static checkUser(checkUser) {
        var userExists;
        var user = new Array();
        this.uds.getUserDataBase().all("SELECT * FROM Users WHERE username = '" + checkUser.getUserName + "'; ", function (err, rows) {
            for (var row of rows) {
                var u1 = new User_1.User(row['id'], row['username'], row['password'], row['isTeacher']);
                user.push(u1);
            }
        });
        if (user.length > 0) {
            userExists = true;
        }
        else {
            userExists = false;
        }
        console.log("user exists: " + userExists);
        return userExists;
    }
    static checkPassword(checkUser) {
        var correctPassword;
        var user = new Array();
        this.uds.getUserDataBase().all("SELECT userName FROM Users WHERE username = '" + checkUser.getUserName +
            "' AND password = '" + checkUser.getUserPassword + "';", function (err, rows) {
            for (var row of rows) {
                var u1 = new User_1.User(row['id'], row['username'], row['password'], row['isTeacher']);
                user.push(u1);
                console.log(err);
            }
        });
        if (user.length > 0) {
            correctPassword = true;
        }
        else {
            correctPassword = false;
        }
        console.log("correct password: " + correctPassword);
        return correctPassword;
    }
    static isUserTeacher(checkUser) {
        var isTeacher;
        var user = new Array();
        this.uds.getUserDataBase().all("SELECT username FROM Users WHERE username = '" + checkUser.getUserName +
            "' AND isTeacher = '" + checkUser.getIsTeacher + "';", function (err, rows) {
            for (var row of rows) {
                var u1 = new User_1.User(row['id'], row['username'], row['password'], row['isTeacher']);
                user.push(u1);
            }
        });
        if (user.length > 0) {
            isTeacher = true;
        }
        else {
            isTeacher = false;
        }
        console.log("user is a teacher: " + isTeacher);
        return isTeacher;
    }
    static loginUser(checkUser, callback) {
        var callback1 = this.checkUser(checkUser);
        var callback2 = this.checkPassword(checkUser);
        var callback3 = this.isUserTeacher(checkUser);
        var userLogin = [
            { "isUserNameOk": callback1, "isPassWordOk": callback2, "isTeacher": callback3 }
        ];
        console.log("userLogin array: ");
        console.log(userLogin);
        callback(userLogin);
    }
}
UserDAO.uds = UserDataSource_1.UserDataSource.getInstance();
exports.UserDAO = UserDAO;
