import {Component} from '@angular/core';
import { NavController } from 'ionic-angular';
import { CreateQuestionComponent, ListQuestionsComponent, EditQuestionComponent} from './index';

//used for interface purposes between all components that manage the questions and redirect towards specific component
@Component({
  templateUrl: 'build/question/manageQuestion.component.html'
})
export class ManageQuestionComponent {

  constructor(public navCtrl : NavController) {
    this.navCtrl = navCtrl;
  }

  //redirects to create questions
  redirectToCreate() {
    this.navCtrl.push(CreateQuestionComponent);
  }

  //redirects to list questions
  redirectToList() {
    this.navCtrl.push(ListQuestionsComponent);
  }

  //redirects to edit questions
  redirectToEdit() {
    this.navCtrl.push(EditQuestionComponent);
  }
}
