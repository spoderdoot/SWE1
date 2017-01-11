import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CreateMCQComponent, CreateOQComponent} from './index';

//NOT USED:
@Component({
  templateUrl: 'build/question/createQuestion.component.html',
})
export class CreateQuestionComponent {

  constructor(public navCtrl: NavController) { }


  redirectToCreateMCQ() {
    this.navCtrl.push(CreateMCQComponent);
  }
  redirectToCreateOQ() {
    this.navCtrl.push(CreateOQComponent);
  }
}
