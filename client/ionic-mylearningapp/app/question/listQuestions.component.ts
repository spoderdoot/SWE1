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

  constructor(public questionsService: QuestionsService) {
  }

  listQuestions() {
    //debugger;
    this.questionsService.getQuestions().subscribe(questions => {
      this.questions = questions;
    });
  }
  redirectToListMCQ() {

  }
}
