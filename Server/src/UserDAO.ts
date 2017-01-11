///<reference path= "UserDataSource.ts"/>
///<reference path= "User.ts"/>
/// <reference path="LoginResult.ts"/>

import { UserDataSource } from './UserDataSource';
import { User } from './User';
import { LoginResult } from './LoginResult';

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
            console.log(users);
        });
    }
    // Creates a new user in the database
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
    // Enables the login
    public static loginUser(checkUser: User, callback) {
        console.log("Check user :")
        var usernameOk: string = "false";
        var passwordOk: string = "false";
        var isUserTeacher: boolean = false;

        var user: Array<User> = new Array<User>();
        this.uds.getUserDataBase().all("SELECT * FROM Users WHERE username = '" + checkUser.getUserName + "';", function(err, rows) {
            for (var row of rows) {
                var u1 = new User(row['id'], row['username'], row['password'], row['isTeacher']);
                user.push(u1);
            }
            if (row != null) {
                usernameOk = "true";
                if (row['passwort'] === checkUser.getUserPassword) {
                    passwordOk = "true";
                    isUserTeacher = row['isTeacher'];
                }
            }
        });
        var loginResult: LoginResult = new LoginResult(usernameOk, passwordOk, isUserTeacher);
        console.log(loginResult);
        callback(loginResult);
    }
}
