import {Component} from '@angular/core';
import { AlertController, NavController, MenuController} from 'ionic-angular';
import {RegisterComponent} from '../register/index';
import { User, LoginService} from '../shared/index';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { QuizComponent, QuizRulesComponent } from '../quiz/index';

//login component is used for the login into the instalearn system by users
@Component({
  templateUrl: 'build/login/login.component.html',
  providers: [LoginService],
})
export class LoginComponent {
private user : User[];
//private username : string;
//private password : string;
private userLoginForm : FormGroup;
  constructor(private alertCtrl : AlertController, public navCtrl : NavController, private formBuilder : FormBuilder, public loginService : LoginService, public menuCtrl : MenuController) {
    this.navCtrl = navCtrl;
    this.createForm();
    //this.menuCtrl.enable(false); ///damit man nicht das Menu aufrufen kann bevor man sich eingeloggt hat.
  }

//static setPages(app : any) {

//}

//creates login form
createForm() {
  this.userLoginForm = this.formBuilder.group({

    username : ['', Validators.compose([Validators.required])],
    password : ['', Validators.compose([Validators.required])]
    //isTeacher : ['1', Validators.compose([Validators.required])]
  })
}

//checks if form is valid
isFormValid() : boolean {

  let isValid: boolean = this.userLoginForm.valid;
  console.log(this.userLoginForm.value.username);
  console.log(this.userLoginForm.value.password);
  console.log(this.userLoginForm.valid);
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

//used for user login
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

//saves the user name into local storage
saveUserName() {
  window.localStorage.setItem("username",  this.userLoginForm.value.username);
  console.log(window.localStorage.getItem("username"));
}

//saves user data into local storage so they can be used for later
saveUserData(username : string, isTeacher : string){

  window.localStorage.setItem("username",  username);
  console.log(window.localStorage.getItem("username"));
  window.localStorage.setItem("isTeacher", isTeacher);
}

//shows success message to the user if he successfully logged in
showSuccessMessage(response : any) {
  console.log("success - user with id " + response + " successfully logged in.");

  const alert = this.alertCtrl.create({
    title: '<b>Erfolgreich eingeloggt!</b>',
    subTitle: 'Jetzt kannst du endlich dein Spiel spielen.',
    buttons: ['Super!']
  });
  alert.present();
}

//redirects to RegisterComponent which is used to register an user
redirectToRegister(){
    this.navCtrl.push(RegisterComponent);
    //  this.viewCtrl.dismiss();
      //this.appCtrl.getRootNav().push(RegisterComponent)
}

//NOT USED ANYMORE BUT MIGHT BE NESSECCARY LATER - redirects to QuizComponent
redirectToQuiz() {
      //this.saveUserName();
      this.navCtrl.setRoot(QuizComponent);
}

//redirects to quiz rules, so user can adjust the quiz before he starts playing
redirectToQuizRules() {
    this.navCtrl.setRoot(QuizRulesComponent);
  }
}
