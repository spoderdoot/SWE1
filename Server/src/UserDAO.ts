///<reference path= "UserDataSource.ts"/>
///<reference path= "User.ts"/>

import { UserDataSource } from './UserDataSource';
import { User } from './User';

export class UserDAO {

    private static uds: UserDataSource = UserDataSource.getInstance();

    public static getUsers(callback) {
        var users: Array<User> = new Array<User>();
        this.uds.getUserDataBase().all("SELECT username,isTeacher FROM Users;", function(err, rows) {
            for (var row of rows) {
                var u1 = new User(row['id'], row['username'], row['password'], row['isTeacher']);
                users.push(u1);
            }
            callback(users);
        });
    }
    public static createUser(newUser: User): Promise<string> {
        var insert: string = "INSERT INTO Users VALUES(NULL,'" + newUser.getUserName + "', '"
            + newUser.getUserPassword + "', 'false');";
        console.log(insert);
        return new Promise(function(resolve, reject) {
            UserDAO.uds.getUserDataBase().run(insert, function(err) {
                var isUserNameOk: string;
                if (err) {
                    console.log("Failed");
                    console.log(err);
                    this.isUserNameOk = "false";
                    console.log(this.isUserNameOk);
                    resolve(this.isUserNameOk);
                } else {
                    console.log("Success " + this.lastID);
                    this.isUserNameOk = "true";
                    resolve(this.isUserNameOk);
                }
            });
        });
    }
    private static checkUser(checkUser: User,callback) {
        var userExists: boolean;
        var user: Array<User> = new Array<User>();
        this.uds.getUserDataBase().all("SELECT * FROM Users WHERE username = '" + checkUser.getUserName + "'; ", function(err, rows) {
            for (var row of rows) {
                var u1 = new User(row['id'], row['username'], row['password'], row['isTeacher']);
                user.push(u1);
            }
        });
        if (user.length > 0) {
            userExists = true;
        } else {
            userExists = false;
        }
        console.log("user exists: " + userExists);
        callback(userExists);
    }
    private static checkPassword(checkUser: User, callback) {
        var correctPassword: boolean;
        var user: Array<User> = new Array<User>();
        this.uds.getUserDataBase().all("SELECT userName FROM Users WHERE username = '" + checkUser.getUserName +
        "' AND password = '" + checkUser.getUserPassword + "';", function(err, rows) {
                for (var row of rows) {
                    var u1 = new User(row['id'], row['username'], row['password'], row['isTeacher']);
                    user.push(u1);
                    console.log(err);
                }
            });
        if (user.length > 0) {
            correctPassword = true;
        } else {
            correctPassword = false;
        }
        console.log("correct password: " + correctPassword);
        callback(correctPassword);
    }
    private static isUserTeacher(checkUser: User, callback) {
        var isTeacher: boolean;
        var user: Array<User> = new Array<User>();
        this.uds.getUserDataBase().all("SELECT username FROM Users WHERE username = '" + checkUser.getUserName +
            "' AND isTeacher = '" + checkUser.getIsTeacher + "';", function(err, rows) {
                for (var row of rows) {
                    var u1 = new User(row['id'], row['username'], row['password'], row['isTeacher']);
                    user.push(u1);
                }
            });
        if (user.length > 0) {
            isTeacher = true;
        } else {
            isTeacher = false;
        }
        console.log("user is a teacher: " + isTeacher);
        callback(isTeacher);
    }
    public static loginUser(checkUser: User, callback) {
        var callback1 = this.checkUser(checkUser, callback);
        var callback2 = this.checkPassword(checkUser, callback);
        var callback3 = this.isUserTeacher(checkUser, callback);
        var userLogin = [
            { "isUserNameOk": callback1, "isPassWordOk": callback2, "isTeacher": callback3 }
        ];
        console.log("userLogin array: ");
        console.log(userLogin);
        callback(userLogin);
    }
}
