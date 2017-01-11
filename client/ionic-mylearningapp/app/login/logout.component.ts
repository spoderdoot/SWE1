import {Component} from '@angular/core';
import { AlertController, App, NavController, MenuController} from 'ionic-angular';

import {LoginComponent } from '../login/index';

//login component is used for the login into the instalearn system by users
@Component({
  templateUrl: 'build/login/logout.component.html',

})
export class LogoutComponent {
  private isLoggedIn: boolean;
  constructor(private alertCtrl: AlertController, public appCtrl: App, public navCtrl: NavController) {
    this.navCtrl = navCtrl;
    this.isLoggedIn = true;

    //this.menuCtrl.enable(false); ///damit man nicht das Menu aufrufen kann bevor man sich eingeloggt hat.
  }

  logout() {
    if (window.localStorage.getItem("isLoggedIn") == "true")
      this.isLoggedIn = false;
    window.localStorage.setItem("isLoggedIn", this.isLoggedIn.toString());
    //back to the login page
    this.navCtrl.setRoot(LoginComponent);

  }
}
