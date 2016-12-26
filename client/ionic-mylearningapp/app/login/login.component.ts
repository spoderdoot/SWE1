import {Component} from '@angular/core';
import { AlertController, NavController, MenuController} from 'ionic-angular';
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
    //his.menuCtrl.disable(); ///damit man nicht das Menu aufrufen kann bevor man sich eingeloggt hat.
  }

//static setPages(app : any) {

//}
createForm() {
  this.userLoginForm = this.formBuilder.group({

    username : ['', Validators.compose([Validators.required])],
    password : ['', Validators.compose([Validators.required])]
    //isTeacher : ['1', Validators.compose([Validators.required])]
  })
}

isFormValid() : boolean {

  let isValid: boolean = this.userLoginForm.valid;
  console.log(this.userLoginForm.value.username);
  console.log(this.userLoginForm.value.password);
  console.log(this.userLoginForm.valid); //is false dunno why
  if(!isValid) {
     const alert = this.alertCtrl.create({
      title: '<b>Angaben überprüfen!</b>',
      subTitle: 'Um dich einzuloggen musst du deinen Namen und Passwort eingeben!',
      buttons: ['OK']
    });
    alert.present();
  }
  return isValid;
}


userLogin() : boolean{

  if(this.isFormValid()) {
    var loginUser = new User(-1, this.userLoginForm.value.username, this.userLoginForm.value.password, false);

    this.loginService.login(loginUser).subscribe(response => {
      this.showSuccessMessage(response);
      console.log(response);
      if(response.isUserNameOk == false || response.isPasswordOk == false) {
        const alert = this.alertCtrl.create({
          title: '<b>Falscher Name oder falsches Passwort!</b>',
          subTitle: 'Bitte überprüfe deine Angaben.',
          buttons: ['Verstanden!']
        });
        alert.present();
          return false;
      }
      this.saveUserData(this.userLoginForm.value.username, response.isTeacher);
      this.redirectToQuiz();
      return true;
      //this.userID = response.userID;
    })
  } else
  return;
}

saveUserName() {
  window.localStorage.setItem("username",  this.userLoginForm.value.username);
  console.log(window.localStorage.getItem("username"));
}
saveUserData(username : string, isTeacher : string){

  window.localStorage.setItem("username",  username);
  console.log(window.localStorage.getItem("username"));
  window.localStorage.setItem("isTeacher", isTeacher);
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
/*login() {
  if(this.userLogin()) {
    this.saveUserData();
    this.redirectToQuiz();
  } *//*else {
    const alert = this.alertCtrl.create({
      title: '<b>Oops! Wir konnten keinen Benutzer mit deinem Namen finden!</b>',
      subTitle: 'Vor Benutzung der App musst du dich registrieren',
      buttons: ['Ok!']
    });
    alert.present();
  }*/

  /*
  login() {
  var loginuser = new User (-1, this.userLoginForm.value.username, this.userLoginForm.value.password, false);
       this.usersService.login(loginuser).subscribe(response => {
         if (response ['status']) {
           if (this.isTeacher) {
              QuizComponent.app.pages = QuizComponent.app.pagesTeacher;
           } else {
            QuizComponent.app.pages = QuizComponent.app.pagesStudent;
             }
           this.loggedIn = true;
         }
       })
    }

  */
  redirectToRegister(){
    this.navCtrl.push(RegisterComponent);
    //  this.viewCtrl.dismiss();
      //this.appCtrl.getRootNav().push(RegisterComponent)
    }

  redirectToQuiz() {
      //this.saveUserName();
      this.navCtrl.setRoot(QuizComponent);

  }
}
