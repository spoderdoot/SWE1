
import {Component} from '@angular/core';
import { AlertController } from 'ionic-angular';

@Component({
  templateUrl: 'build/login/register.html'
})
export class RegisterComponent {

  private alreadyRegistered : boolean = false;
  private userName : string;
  private password : string;
  private isTeacher : boolean = false;
  private alertCtrl : AlertController;

  constructor(userName : string, password : string) {
    this.userName = userName;
    this.password = password;
  }

  register () {
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
    }

  }

}
