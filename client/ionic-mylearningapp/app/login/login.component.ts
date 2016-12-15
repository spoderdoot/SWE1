import {Component} from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';
import {RegisterComponent} from '../register/index';
import { User, LoginService} from '../shared/index';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { QuizComponent } from '../quiz/index';

@Component({
  templateUrl: 'build/login/login.component.html',
  providers: [LoginService],
})
export class LoginComponent {
private user : User[];
//private username : string;
//private password : string;
private userLoginForm : FormGroup;
  constructor(private alertCtrl : AlertController, public navCtrl : NavController, private formBuilder : FormBuilder, public loginService : LoginService) {
    this.navCtrl = navCtrl;
    this.createForm();
    /*menuCrtl.disable(); *///damit man nicht das Menu aufrufen kann bevor man sich eingeloggt hat.
  }

createForm() {
  this.userLoginForm = this.formBuilder.group({

    username : ['', Validators.compose([Validators.required])],
    password : ['', Validators.compose([Validators.required])]
  })
}

isFormValid() : boolean {
  let isValid : boolean = this.userLoginForm.valid;

  if(!isValid) {
    const alert = this.alertCtrl.create({
      title: '<b>Angaben überprüfen!</b>',
      subTitle: 'Um dich zu einzuloggen musst du deinen Namen und Passwort eingeben!',
      buttons: ['OK']
    });
    alert.present();
  }
  return isValid;
}

showSuccessMessage(response : any) {
  console.log("success - user with id " + response + " successfully logged in.");

  const alert = this.alertCtrl.create({
    title: '<b>Erfolgreich eingeloggt!</b>',
    subTitle: 'Jetzt kannst du endlich dein Spiel spielen.',
    buttons: ['Super!']
  });
  alert.present();
  //this.createForm();
}

getUser() {
  this.loginService.getUser().subscribe(user => {
    this.user = user;
  })
}
  /*
  login(userName : string, password : string) {
    if (this.username == null) {
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
      this.username = userName;
      this.password = password;
    }
  }
  loggedIn() : boolean {
    return
  }
  */
  redirectToRegister() {
    this.navCtrl.push(RegisterComponent);
    //  this.viewCtrl.dismiss();
      //this.appCtrl.getRootNav().push(RegisterComponent)
    }

  redirectToQuiz() {
    this.navCtrl.push(QuizComponent);
  }
}
