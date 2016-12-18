import { Component } from '@angular/core';
import { Question, MultipleChoiceQuestion, QuestionsService} from '../shared/index';

@Component({
  templateUrl: 'build/question/listMCQ.component.html',
  providers: [QuestionsService],
})
export class ListMCQComponent {
  private multipleChoiceQuestions: MultipleChoiceQuestion[] = [];

  constructor(public questionsService: QuestionsService) {
  }

  listMultipleChoiceQuestions() {
    //debugger;
    this.questionsService.getMultipleChoiceQuestions().subscribe(questions => {
      this.multipleChoiceQuestions = questions;
    });
  }
}
