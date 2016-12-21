///<reference path= "UserDataSource.ts"/>
///<reference path= "User.ts"/>

import { UserDataSource } from './UserDataSource';
import { User } from './User';

export class UserDAO {

    private static uds: UserDataSource = UserDataSource.getInstance();

    public static getUsers(callback) {
        var users: Array<User> = new Array<User>();
        this.uds.getUserDataBase().all("SELECT userID, userName FROM Users;", function(err, rows) {
            for (var row of rows) {
                var u1 = new User(row['userID'], row['userName'], row['password'], row['isTeacher']);
                users.push(u1);
            }
            callback(users);
        })
    }
    public static createUser(newUser: User): Promise<number> {
      var insert: string = "INSERT INTO Users VALUES (NULL, ')" + newUser.getUserName
                            + "', '" + newUser.getUserPassword
                            + "', '" + newUser.getIsTeacher + ")";
      console.log(insert);
      return new Promise(function(resolve, reject) {
        UserDAO.uds.getUserDataBase().run(insert, function(err) {
          if (err) {
            console.log("Failed.");
          } else {
            console.log("Success " + this.lastID);
            resolve(this.lastID);
          }
        });
      });
    }
    public static loginUser(username: string, password: string, callback) {
        var query = "SELECT userName FROM Users WHERE '"+username + "' = Users." + username +
            " \nAND '" + password + "' = Users." + password;
        this.uds.getUserDataBase().get(query, function(err, row) {
            var user = new User(row['id'], row['userName'], row['password'], row['isTeacher']);
            callback(user);
        });
    }
}
