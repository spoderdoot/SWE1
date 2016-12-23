///<reference path= "UserDataSource.ts"/>
///<reference path= "User.ts"/>

import { UserDataSource } from './UserDataSource';
import { User } from './User';

export class UserDAO {

    private static uds: UserDataSource = UserDataSource.getInstance();

    public static getUsers(callback) {
        var users: Array<User> = new Array<User>();
        this.uds.getUserDataBase().all("SELECT id, userName FROM Users;", function(err, rows) {
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
              var isUserNameOk: string = "false";
                if (err) {
                    console.log("Failed");
                    console.log(err);
                    resolve(isUserNameOk);
                } else {
                    console.log("Success " + this.lastID);
                    this.isUserNameOk = true;
                    resolve(isUserNameOk);
                }
            });
        });
    }
    private static checkUser(username: string): boolean {
        var isEmpty: boolean = true;
        var user: Array<User> = new Array<User>();
        this.uds.getUserDataBase().all("SELECT userName FROM Users WHERE userName = '" + username + "'; ", function(err, rows) {
            for (var row of rows) {
                var u1 = new User(row['id'], row['username'], row['password'], row['isTeacher']);
                user.push(u1);
            }
        });
        if (user.length != 0) {
            isEmpty = false;
        }
        return isEmpty;
    }

    public static loginUser(username: string, password: string, callback) {
        var query = "SELECT * FROM Users WHERE username = '" + username + "' AND password = '"+password+"';";
        var userExists: boolean = this.checkUser(username);
        this.uds.getUserDataBase().get(query, function(err, row) {
            var userLogin = new Array(row['isUserNameOk'], row['isPassWordOk'], row['isTeacher']);
            callback(userLogin);
            console.log(err);
        });
    }
}
