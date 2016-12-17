import { Component } from '@angular/core';
import { OpenQuestion, QuestionsService} from '../shared/index';
import { NavController } from 'ionic-angular';
import { ListMCQComponent} from './index';


@Component({
  templateUrl: 'build/question/listQuestions.component.html',
  providers: [QuestionsService],
})
export class ListOQComponent {
  private questions: OpenQuestion[] = [];

  constructor(public questionsService: QuestionsService, public navCtrl : NavController) {
    this.navCtrl = navCtrl;
  }

  listQuestions() {
    //debugger;
    this.questionsService.getOpenQuestions().subscribe(questions => {
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
