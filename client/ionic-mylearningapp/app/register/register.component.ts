
import {Component} from '@angular/core';
import { AlertController } from 'ionic-angular';

@Component({
  templateUrl: 'build/register/register.component.html'
})
export class RegisterComponent {

  private alreadyRegistered : boolean = false;
  private userName : string;
  private password : string;
  private isTeacher : boolean = false;


  constructor(private alertCtrl : AlertController) {

  }

  register (userName : string, password : string) {
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

  loggedIn() {
    return false;
  }

}
