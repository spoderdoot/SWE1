
import {Component} from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';
import { User, LoginService} from '../shared/index';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { LoginComponent} from '../login/index';

@Component({
  templateUrl: 'build/register/register.component.html',
  providers: [LoginService],
})
export class RegisterComponent {
  private createUserForm: FormGroup;



  constructor(private alertCtrl : AlertController, public navCtrl : NavController, private formBuilder : FormBuilder, public loginService : LoginService) {
    this.createForm();
  }

 createForm() {
   this.createUserForm = this.formBuilder.group({

      username : ['', Validators.compose([Validators.required])],
      password : ['', Validators.compose([Validators.required])]
   })
 }


createUserAndRedirectToLogin() {
  if(this.isFormValid()) {
    //user with ID, username, password, not teacher
    var newUser = new User(-1, this.createUserForm.value.username, this.createUserForm.value.password, false);

    this.loginService.createUser(newUser).subscribe(response => {
      this.showSuccessMessage(response);
      if(response.isUserNameOk == false) {
        const alert = this.alertCtrl.create({
          title: '<b>Benutzer gibts schon!</b>',
          subTitle: 'Bitte verwende einen anderen Benutzernamen.',
          buttons: ['Verstanden!']
        });
        alert.present();
          return false;
      }
    })
    this.redirectToLogin();
  }
}


isFormValid() : boolean {
  let isValid : boolean = this.createUserForm.valid;
  console.log(this.createUserForm);
  if(!isValid) {
    const alert = this.alertCtrl.create({
      title: '<b>Angaben überprüfen!</b>',
      subTitle: 'Um dich zu registrieren musst du deinen Namen und Passwort eingeben!',
      buttons: ['OK']
    });
    alert.present();
  }
  return isValid;
}

showSuccessMessage(response : any) {
  console.log("success - user was successfully sotred with id " + response);

  const alert = this.alertCtrl.create({
    title: '<b>Benutzer registriert!</b>',
    subTitle: 'Der Schüler wurde unter der Id ' + response + ' gespeichert.',
    buttons: ['OK']
  });
  alert.present();
  //this.createForm();
}

redirectToLogin() {
  this.navCtrl.setRoot(LoginComponent);
}

}
