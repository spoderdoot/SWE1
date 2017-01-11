
import {Component} from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';
import { User, LoginService} from '../shared/index';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { LoginComponent} from '../login/index';
import { AboutModalComponent} from '../about/index';

//used for registering user
@Component({
  templateUrl: 'build/register/register.component.html',
  providers: [LoginService],
})
export class RegisterComponent {

  //used for the form of register user
  private createUserForm: FormGroup;

  constructor(private alertCtrl : AlertController, public navCtrl : NavController, private formBuilder : FormBuilder, public loginService : LoginService) {
    //initializing form
    this.createForm();
  }

//used to create form
 createForm() {
   this.createUserForm = this.formBuilder.group({
     //each user has a username and a password
      username : ['', Validators.compose([Validators.required])],
      password : ['', Validators.compose([Validators.required])]
   })
 }

//used to create user and redirect user to login
createUserAndRedirectToLogin() {
  //checks if form is valid
  if(this.isFormValid()) {
    //user with ID, username, password, not teacher
    //only students are allowed to register through this form, teacher have to send an email to be registered manually by InstaLearn Service team
    var newUser = new User(-1, this.createUserForm.value.username, this.createUserForm.value.password, false);

    this.loginService.createUser(newUser).subscribe(response => {
      console.log("register response from server: " + response);
      //if response is false, the user already exists in the IDBDatabase
      if(response == false) {
        const alert = this.alertCtrl.create({
          title: '<b>Benutzername bereits in Verwendung</b>',
          subTitle: 'Bitte verwende einen anderen Benutzernamen.',
          buttons: ['Verstanden!']
        });
          //shows user that his desired username is already in use
          alert.present();

      } else {
        //username isnt used yet, user gets registered and redirected to login conmponent
          this.showSuccessMessage(this.createUserForm.value.username);
          this.redirectToLogin();
      }
    })
  }
}

//checks if form is valid
isFormValid() : boolean {
  let isValid : boolean = this.createUserForm.valid;
  let noWhiteSpace : boolean = this.checkForWhiteSpace(this.createUserForm.value.username);
  console.log(this.createUserForm);
  if(!isValid) {
    const alert = this.alertCtrl.create({
      title: '<b>Angaben überprüfen!</b>',
      subTitle: 'Um dich zu registrieren musst du deinen Namen und Passwort eingeben!',
      buttons: ['OK']
    });
    alert.present();
  }
  if(!noWhiteSpace) {
    const alert = this.alertCtrl.create({
      title: '<b>Angaben überprüfen!</b>',
      subTitle: 'Leerzeichen zählen leider nicht für einen Benutzernamen!',
      buttons: ['OK']
    });
    alert.present();
  }
  if(isValid && noWhiteSpace) {
    return isValid;
  }
}

checkForWhiteSpace(input : string) : boolean {
  var result = /\S/.test(input);
  console.log(result);
  return result;
}

//shows user success message if he was able to be registered
showSuccessMessage(response : any) {
  console.log("success - user wurde unter dem Namen " + response + " gespeichert.");

  const alert = this.alertCtrl.create({
    title: '<b>Als Schüler registriert!</b>',
    subTitle: 'Der Schüler wurde unter dem Namen ' + response + ' gespeichert.',
    buttons: ['OK']
  });
  alert.present();
}

//redirects to login component
redirectToLogin() {
  this.navCtrl.setRoot(LoginComponent);
}

//redirects to about component
redirectToAbout() {
  this.navCtrl.push(AboutModalComponent);
}



}
