"use strict";
const UserDataSource_1 = require("./UserDataSource");
const User_1 = require("./User");
class UserDAO {
    static getUsers(callback) {
        var users = new Array();
        this.uds.getUserDataBase().all("SELECT userID, userName FROM Users;", function (err, rows) {
            for (var row of rows) {
                var u1 = new User_1.User(row['userID'], row['username'], row['password'], row['isTeacher']);
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
                if (err) {
                    console.log("Failed");
                    console.log(err);
                    resolve(-1);
                }
                else {
                    console.log("Success " + this.lastID);
                    resolve(this.lastID);
                }
            });
        });
    }
    static loginUser(username, password, callback) {
        var query = "SELECT userName FROM Users WHERE '" + username + "' = Users." + username +
            " \nAND '" + password + "' = Users." + password;
        this.uds.getUserDataBase().get(query, function (err, row) {
            var user = new User_1.User(row['id'], row['userName'], row['password'], row['isTeacher']);
            callback(user);
        });
    }
}
UserDAO.uds = UserDataSource_1.UserDataSource.getInstance();
exports.UserDAO = UserDAO;
