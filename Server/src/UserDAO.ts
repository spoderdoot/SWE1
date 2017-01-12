///<reference path= "UserDataSource.ts"/>
///<reference path= "User.ts"/>
/// <reference path="LoginResult.ts"/>

import { UserDataSource } from './UserDataSource';
import { User } from './User';
import { LoginResult } from './LoginResult';

/**
 * This class is the connection between the REST-api and the user database
 *
 * @author Fernando Francisco Pfennig
 */
export class UserDAO {

    // Sets the datasource uds to the available instance of a user database
    private static uds: UserDataSource = UserDataSource.getInstance();

    // Lists all users
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
        console.log("Check user :");
        var isUserNameOk: string = "false";
        var isPasswordOk: string = "false";
        var isTeacher: boolean = false;

        var query: string = "SELECT * FROM Users WHERE username = '" + checkUser.getUserName + "'" + "AND password = '" + checkUser.getUserPassword + "' ;";
        var user: Array<User> = new Array<User>();
        this.uds.getUserDataBase().all(query, function(err, rows) {
            for (var row of rows) {
                var u1 = new User(row['id'], row['username'], row['password'], row['isTeacher']);
                user.push(u1);
            }
            // If there is a user who uses the given username and password there will always be one row
            // since every username has to be unique, meaning that if the given combination exists in
            // the database the row will be set to 1
            if (row != null) {
                isUserNameOk = "true";
                isPasswordOk = "true";
                isTeacher = row['isTeacher'];
            } else {
                isTeacher = false;
            }
            var loginResult: LoginResult = new LoginResult(isUserNameOk, isPasswordOk, isTeacher);
            console.log(loginResult);
            callback(loginResult);
        });
    }
}
