import { Component } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Question, QuestionsService} from '../shared/index';
import { EditMCQComponent, EditOQComponent} from './index';
// NOT IMPLEMENTED YET import { EditMCQComponent, EditOQComponent} from './index';

//NOT IMPLEMENTED YET -used for editting questions
@Component({
  templateUrl: 'build/question/editQuestion.component.html',
  providers: [QuestionsService],
})
export class EditQuestionComponent {

  constructor(public alertCtrl : AlertController, public navCtrl : NavController){}


  // NOT IMPLEMENTED YET
  //redirects to edit multiple choice questions
  redirectToEditMCQ() {
    this.navCtrl.push(EditMCQComponent);
  }

  //redirects to edit open questions
  redirectToEditOQ() {
      this.navCtrl.push(EditOQComponent);

  }

}
