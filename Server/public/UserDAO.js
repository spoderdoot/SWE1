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
        var isOk = false;
        var insert = "INSERT INTO Users VALUES(NULL,'" + newUser.getUserName + "', '"
            + newUser.getUserPassword + "', 'false');";
        console.log(insert);
        return new Promise(function (resolve, reject) {
            UserDAO.uds.getUserDataBase().run(insert, function (err) {
                if (err) {
                    console.log("Failed");
                    console.log(err);
                    resolve(isOk);
                }
                else {
                    console.log("Success " + this.lastID);
                    this.isOk = true;
                    resolve(this.isOk);
                }
            });
        });
    }
    static checkUser(username) {
        var isEmpty;
        var user = new Array();
        var json = this.uds.getUserDataBase().all("SELECT userName FROM Users WHERE userName = '" + username + "'; ", function (err, rows) {
            for (var row of rows) {
                var u1 = new User_1.User(row['id'], row['username'], row['password'], row['isTeacher']);
                user.push(u1);
            }
        });
    }
    static loginUser(username, password, callback) {
        var query = "SELECT * FROM Users WHERE username = '" + username + "';";
        this.uds.getUserDataBase().get(query, function (err, row) {
            var userLogin = new Array(row['isUserNameOk'], row['isPassWordOk'], row['isTeacher']);
            callback(userLogin);
            console.log(err);
        });
    }
}
UserDAO.uds = UserDataSource_1.UserDataSource.getInstance();
exports.UserDAO = UserDAO;
