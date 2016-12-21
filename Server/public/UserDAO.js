"use strict";
const UserDataSource_1 = require("./UserDataSource");
const User_1 = require("./User");
class UserDAO {
    static getUsers(callback) {
        var users = new Array();
        this.uds.getUserDataBase().all("SELECT userID, userName FROM Users;", function (err, rows) {
            for (var row of rows) {
                var u1 = new User_1.User(row['userID'], row['userName'], row['password']);
                users.push(u1);
            }
            callback(users);
        });
    }
}
UserDAO.uds = UserDataSource_1.UserDataSource.getInstance();
exports.UserDAO = UserDAO;
