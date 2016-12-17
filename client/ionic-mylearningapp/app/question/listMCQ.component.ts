import { Component } from '@angular/core';
import { Question, MultipleChoiceQuestion, QuestionsService} from '../shared/index';

@Component({
  templateUrl: 'build/question/listMCQ.component.html',
  providers: [QuestionsService],
})
export class ListMCQComponent {
  private questions: Question[] = [];

  constructor(public questionsService: QuestionsService) {
  }

  listQuestions() {
    //debugger;
    this.questionsService.getQuestions().subscribe(questions => {
      this.questions = questions;
    });
  }
}
