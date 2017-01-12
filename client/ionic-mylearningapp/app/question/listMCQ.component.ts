import { Component } from '@angular/core';
import { MultipleChoiceQuestion, QuestionsService} from '../shared/index';

//used for showing the user all multiple choice questions(MCQ)
@Component({
  templateUrl: 'build/question/listMCQ.component.html',
  providers: [QuestionsService],
})
export class ListMCQComponent {
  private multipleChoiceQuestions: MultipleChoiceQuestion[] = [];

  constructor(public questionsService: QuestionsService) {
  }

  //lists all MCQs
  listMultipleChoiceQuestions() {
    //debugger;
    this.questionsService.getMultipleChoiceQuestions().subscribe(questions => {
      this.multipleChoiceQuestions = questions;
    });
  }
}
