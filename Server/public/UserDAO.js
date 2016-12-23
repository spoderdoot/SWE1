"use strict";
const UserDataSource_1 = require("./UserDataSource");
const User_1 = require("./User");
class UserDAO {
    static getUsers(callback) {
        var users = new Array();
        this.uds.getUserDataBase().all("SELECT id, userName FROM Users;", function (err, rows) {
            for (var row of rows) {
                var u1 = new User_1.User(row['id'], row['username'], row['password'], row['isTeacher']);
                users.push(u1);
            }
            callback(users);
        });
    }
    static createUser(newUser) {
        var isUserNameOk = false;
        var insert = "INSERT INTO Users VALUES(NULL,'" + newUser.getUserName + "', '"
            + newUser.getUserPassword + "', 'false');";
        console.log(insert);
        return new Promise(function (resolve, reject) {
            UserDAO.uds.getUserDataBase().run(insert, function (err) {
                if (err) {
                    console.log("Failed");
                    console.log(err);
                    resolve(this.isUserNameOk);
                }
                else {
                    console.log("Success " + this.lastID);
                    this.isUserNameOk = true;
                    resolve(this.isUserNameOk);
                }
            });
        });
    }
    static checkUser(username) {
        var isEmpty = true;
        var user = new Array();
        this.uds.getUserDataBase().all("SELECT userName FROM Users WHERE userName = '" + username + "'; ", function (err, rows) {
            for (var row of rows) {
                var u1 = new User_1.User(row['id'], row['username'], row['password'], row['isTeacher']);
                user.push(u1);
            }
        });
        if (user.length != 0) {
            isEmpty = false;
        }
        return isEmpty;
    }
    static loginUser(username, password, callback) {
        var query = "SELECT * FROM Users WHERE username = '" + username + "';";
        var userExists = this.checkUser(username);
        this.uds.getUserDataBase().get(query, function (err, row) {
            var userLogin = new Array(row['isUserNameOk'], row['isPassWordOk'], row['isTeacher']);
            callback(userLogin);
            console.log(err);
        });
    }
}
exports.UserDAO = UserDAO;
UserDAO.uds = UserDataSource_1.UserDataSource.getInstance();
