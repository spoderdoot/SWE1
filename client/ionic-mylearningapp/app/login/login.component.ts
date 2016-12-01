import {Component} from '@angular/core';


@Component({
  templateUrl: 'build/login/login.component.html'
})
export class LoginComponent {
  private userName : string;
  private password : string;
  constructor() {}

  login(userName : string, password : string) {

  }
  redirectToRegister() {}
}
