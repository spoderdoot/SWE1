import {Component} from '@angular/core';
import { NavController } from 'ionic-angular';
import { CreateQuestionComponent, ListQuestionsComponent, EditQuestionComponent, DeleteQuestionComponent} from './index';


@Component({
  templateUrl: 'build/question/manageQuestion.component.html'
})
export class ManageQuestionComponent {

  constructor(public navCtrl : NavController) {
    this.navCtrl = navCtrl;
  }

  redirectToCreate() {
    this.navCtrl.push(CreateQuestionComponent);
  }

  redirectToList() {
    this.navCtrl.push(ListQuestionsComponent);
  }

  redirectToEdit() {
    this.navCtrl.push(EditQuestionComponent);
  }

  redirectToDelete() {
    this.navCtrl.push(DeleteQuestionComponent);
    //  <button (click) = "redirectToDelete()" full >Frage löschen</button>
  }
}
