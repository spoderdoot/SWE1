"use strict";
const UserDataSource_1 = require("./UserDataSource");
const User_1 = require("./User");
const LoginResult_1 = require("./LoginResult");
class UserDAO {
    static getUsers(callback) {
        var users = new Array();
        this.uds.getUserDataBase().all("SELECT username,isTeacher FROM Users;", function (err, rows) {
            for (var row of rows) {
                var u1 = new User_1.User(row['id'], row['username'], row['password'], row['isTeacher']);
                users.push(u1);
            }
            callback(users);
            console.log(users);
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
    static loginUser(checkUser, callback) {
        console.log("Check user :");
        var isUserNameOk = "false";
        var isPasswordOk = "false";
        var isTeacher = false;
        var query = "SELECT * FROM Users WHERE username = '" + checkUser.getUserName + "'" + "AND password = '" + checkUser.getUserPassword + "' ;";
        var user = new Array();
        this.uds.getUserDataBase().all(query, function (err, rows) {
            for (var row of rows) {
                var u1 = new User_1.User(row['id'], row['username'], row['password'], row['isTeacher']);
                user.push(u1);
            }
            if (row = 1) {
                isUserNameOk = "true";
                isPasswordOk = "true";
                isTeacher = row['isTeacher'];
            }
            var loginResult = new LoginResult_1.LoginResult(isUserNameOk, isPasswordOk, isTeacher);
            console.log(loginResult);
            callback(loginResult);
        });
    }
}
UserDAO.uds = UserDataSource_1.UserDataSource.getInstance();
exports.UserDAO = UserDAO;
