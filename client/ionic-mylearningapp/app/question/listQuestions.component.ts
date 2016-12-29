import { Component } from '@angular/core';
import { Question, QuestionsService} from '../shared/index';
import { NavController } from 'ionic-angular';
import { ListMCQComponent, ListOQComponent} from './index';

//used to list questions to the user
@Component({
  templateUrl: 'build/question/listQuestions.component.html',
  providers: [QuestionsService],
})
export class ListQuestionsComponent {
  private questions: Question[] = [];

  constructor(public questionsService: QuestionsService, public navCtrl: NavController) {
    this.navCtrl = navCtrl;
    //this.listQuestions();
  }

  /*
  //NOT USED RIGHT NOW
  listQuestions() {
    //debugger;
    this.questionsService.getQuestions().subscribe(questions => {
      this.questions = questions;
    });
  }
  */

  //redirects to list multiple choice questions
  redirectToListMCQ() {
    this.navCtrl.push(ListMCQComponent);
  }

  //redirects to list open questions
  redirectToListOQ() {
      this.navCtrl.push(ListOQComponent);

  }
}
