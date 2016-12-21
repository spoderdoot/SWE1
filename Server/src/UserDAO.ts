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
         var u1 = new User(row['userID'], row['userName'],row['password']);
         users.push(u1);
       }
       callback(users);
     })
  }
}
