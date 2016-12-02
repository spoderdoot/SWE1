import {Component} from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';
import {RegisterComponent} from '../register/index';

@Component({
  templateUrl: 'build/login/login.component.html'
})
export class LoginComponent {
  private userName : string;
  private password : string;
  constructor(private alertCtrl : AlertController, public navCtrl : NavController) {
    this.navCtrl = navCtrl;


    /*menuCrtl.disable(); *///damit man nicht das Menu aufrufen kann bevor man sich eingeloggt hat.


  }

  login(userName : string, password : string) {
    if (this.userName == null) {
      const alert = this.alertCtrl.create({
        title: '<b>Angaben überprüfen!</b>',
        subTitle: 'Um dich zu registrieren musst du deinen Namen eingeben!',
        buttons: ['OK']
      });
      alert.present();
      return;
    }
    if (this.password == null) {
      const alert = this.alertCtrl.create({
        title: '<b>Angaben überprüfen!</b>',
        subTitle: 'Um dich zu registrieren musst du dein Passwort eingeben!',
        buttons: ['OK']
      });
      alert.present();
      return;
    } else {
      this.userName = userName;
      this.password = password;
    }
  }
  loggedIn() : boolean {
    return
  }
  redirectToRegister() {
    this.navCtrl.push(RegisterComponent);
    //  this.viewCtrl.dismiss();
      //this.appCtrl.getRootNav().push(RegisterComponent)
    }
}
