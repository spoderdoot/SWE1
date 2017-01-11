import {Component} from '@angular/core';
import { AlertController, App, NavController, MenuController} from 'ionic-angular';
import {RegisterComponent} from '../register/index';
import { User, LoginResult, LoginService} from '../shared/index';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { QuizComponent, QuizRulesComponent } from '../quiz/index';
import {ManageQuestionComponent } from '../question/index';

//login component is used for the login into the instalearn system by users
@Component({
  templateUrl: 'build/login/login.component.html',
  providers: [LoginService],
})
export class LoginComponent {
private user : User[];
private loginResult : LoginResult;
//private username : string;
//private password : string;
private userLoginForm : FormGroup;
private isTeacher : boolean;
private isLoggedIn : boolean;
private static app : any;

  constructor(private alertCtrl : AlertController, public appCtrl : App, public navCtrl : NavController, private formBuilder : FormBuilder, public loginService : LoginService, public menuCtrl : MenuController) {
    this.navCtrl = navCtrl;
    this.createForm();
    //this.menuCtrl.enable(false); ///damit man nicht das Menu aufrufen kann bevor man sich eingeloggt hat.
  }

static setPages(app : any) {
  this.app = app;
}

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
userLogin(){

  if(this.isFormValid()) {
    var loginUser = new User(-1, this.userLoginForm.value.username, this.userLoginForm.value.password, false);

    this.loginService.login(loginUser).subscribe(response => {
      //this.showSuccessMessage(response);
      console.log(response);
      this.loginResult = response;
      console.log(this.loginResult);
      if(this.loginResult.isUserNameOk == "false" || this.loginResult.isPasswordOk == "false") {
        const alert = this.alertCtrl.create({
          title: '<b>Falscher Name oder falsches Passwort!</b>',
          subTitle: 'Bitte überprüfe deine Angaben.',
          buttons: ['Verstanden!']
        });
        alert.present();
          return false;
      }
      this.isLoggedIn = true;
      this.isTeacher = this.loginResult.isTeacher;
      console.log("is user a teacher? " + this.isTeacher);
      this.saveUserData(this.userLoginForm.value.username, response.isTeacher);
      this.redirectAfterLogin();

      //this.userID = response.userID;
    })
  } 
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

//USED FOR TEST PURPOSES, different handling between teacher and student works as intented - waiting for server implementation
redirectToQuizRules() {
  this.isLoggedIn = true;
  this.isTeacher = false;
  if(this.isLoggedIn && !this.isTeacher) { //for students
    LoginComponent.app.pages = LoginComponent.app.pagesStudent;
    this.navCtrl.setRoot(QuizRulesComponent);
  } else if(this.isLoggedIn && this.isTeacher) { //for teacher
    LoginComponent.app.pages = LoginComponent.app.pagesTeacher;
    this.navCtrl.setRoot(ManageQuestionComponent);
  }
  //this.navCtrl.setRoot(QuizRulesComponent);
}
  //redirects to another component after login depending on user status
  redirectAfterLogin() {
    if(this.isLoggedIn && !this.isTeacher) { //for students
      LoginComponent.app.pages = LoginComponent.app.pagesStudent;
      this.navCtrl.setRoot(QuizRulesComponent);
    } else if(this.isLoggedIn && this.isTeacher) { //for teacher
      LoginComponent.app.pages = LoginComponent.app.pagesTeacher;
      this.navCtrl.setRoot(ManageQuestionComponent);
    }
  }
}
