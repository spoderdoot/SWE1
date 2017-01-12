import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ListMCQComponent, ListOQComponent} from './index';

//used to list questions to the user
@Component({
  templateUrl: 'build/question/listQuestions.component.html',
})
export class ListQuestionsComponent {
  constructor(public navCtrl: NavController) {
    this.navCtrl = navCtrl;
  }

  //redirects to list multiple choice questions
  redirectToListMCQ() {
    this.navCtrl.push(ListMCQComponent);
  }

  //redirects to list open questions
  redirectToListOQ() {
    this.navCtrl.push(ListOQComponent);

  }
}
