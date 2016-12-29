import {Settings, SettingsService} from '../settings/index';
import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {User} from './user.model';

//login service is used for the connection between server and client in the register and login component
@Injectable()
export class LoginService {
  private static settingsService : SettingsService = SettingsService.getInstance();
  private settings : Settings;

  constructor(private http : Http) {
    this.loadSettings();
  }

  private loadSettings() {
    LoginService.settingsService.loadSettings().then(settings => {
      this.settings = settings;
    })
  }
  /*
  //NOT USED YET - used to get an array with all users form server
  getUser() : Observable<User[]> {

    console.log("getUser - ServerIP: " + this.settings.serverIp);

    return this.http
    .get(this.settings.serverIp + 'listUsers')
    .map((res: Response) => res.json());
  }
  */

  /*
  //NOT USED YET - used for getting a specific user depending on ID
  getUserWithId(id : number) : Observable<User> {
    return this.http
    .get(this.settings.serverIp + 'user/' + id)
    .map((res: Response) => res.json());
  }
  */

  //used for creating a user and sending user information to server
  createUser(user : User) : Observable<any> {
    console.log(JSON.stringify(user));
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http
    .put(this.settings.serverIp + 'user/create', JSON.stringify(user), {headers : headers})
    .map((res : Response) => res.json());
  }

  //used to check if user is already registered
  checkUser(username : string) : Observable<any> { //vlt kein observable
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http
    .post(this.settings.serverIp + 'login/asd', JSON.stringify(username), {headers : headers})
    .map((res: Response) => res.json());
  }

  //used for login, also checks if user is already registered
  login(user : User) : Observable<any> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http
      .post(this.settings.serverIp + 'user/login', JSON.stringify(user), { headers: headers })
      .map((res: Response) => res.json());
  }
}
