import { Component } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';
import { EditMCQComponent, EditOQComponent} from './index';

//used for editting questions
@Component({
  templateUrl: 'build/question/editQuestion.component.html',
})
export class EditQuestionComponent {

  constructor(public navCtrl: NavController) { }

  //redirects to edit multiple choice questions
  redirectToEditMCQ() {
    this.navCtrl.push(EditMCQComponent);
  }

  //redirects to edit open questions
  redirectToEditOQ() {
    this.navCtrl.push(EditOQComponent);

  }

}
