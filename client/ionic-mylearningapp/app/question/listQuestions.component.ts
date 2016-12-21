import { Component } from '@angular/core';
import { Question, QuestionsService} from '../shared/index';
import { NavController } from 'ionic-angular';
import { ListMCQComponent, ListOQComponent} from './index';


@Component({
  templateUrl: 'build/question/listQuestions.component.html',
  providers: [QuestionsService],
})
export class ListQuestionsComponent {
  private questions: Question[] = [];

  constructor(public questionsService: QuestionsService, public navCtrl: NavController) {
    this.navCtrl = navCtrl;
  }

  listQuestions() {
    //debugger;
    this.questionsService.getQuestions().subscribe(questions => {
      this.questions = questions;
    });
  }
  redirectToListMCQ() {
    this.navCtrl.push(ListMCQComponent);
  }

  redirectToListOQ() {
    this.navCtrl.push(ListOQComponent);
  }
}
