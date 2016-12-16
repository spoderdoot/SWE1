import {Settings, SettingsService} from '../settings/index';
import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {User} from './user.model';

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

  getUser() : Observable<User[]> {

    console.log("getUser - ServerIP: " + this.settings.serverIp);

    return this.http
    .get(this.settings.serverIp + 'listUsers')
    .map((res: Response) => res.json());
  }

  getUserWithId(id : number) : Observable<User> {
    return this.http
    .get(this.settings.serverIp + 'user/' + id)
    .map((res: Response) => res.json());
  }

  createUser(user : User) : Observable<any> {
    console.log(JSON.stringify(user));
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http
    .put(this.settings.serverIp + 'user/create', JSON.stringify(user), {headers : headers})
    .map((res : Response) => res.json());
  }
  
  checkUser(username : string) : Observable<any> { //vlt kein observable
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http
    .post(this.settings.serverIp + 'login/', JSON.stringify(username), {headers : headers})
    .map((res: Response) => res.json());



  }
}
