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
    static checkUser(username) {
        var isEmpty = "true";
        var user = new Array();
        this.uds.getUserDataBase().all("SELECT userName FROM Users WHERE userName = '" + username + "'; ", function (err, rows) {
            for (var row of rows) {
                var u1 = new User_1.User(row['id'], row['username'], row['password'], row['isTeacher']);
                user.push(u1);
            }
        });
        if (user.length != 0) {
            isEmpty = "false";
        }
        return isEmpty;
    }
    static checkPassword(username, password) {
        var is;
    }
    static loginUser(username, password, callback) {
        var query = "SELECT * FROM Users WHERE username = '" + username + "' AND password = '" + password + "';";
        this.uds.getUserDataBase().get(query, function (err, row) {
            var userLogin = [
                { "isUserNameOk": this.checkUser(username), "isPassWordOk": this.checkPassword(username, password), "isTeacher": "false" }
            ];
            callback(userLogin);
            console.log(err);
        });
    }
}
exports.UserDAO = UserDAO;
UserDAO.uds = UserDataSource_1.UserDataSource.getInstance();
