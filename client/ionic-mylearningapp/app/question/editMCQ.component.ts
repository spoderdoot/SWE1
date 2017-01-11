import { Component } from '@angular/core';
import { Question, MultipleChoiceQuestion, QuestionsService} from '../shared/index';

//used for showing the user all multiple choice questions(MCQ)
@Component({
  templateUrl: 'build/question/editMCQ.component.html',
  providers: [QuestionsService],
})
export class EditMCQComponent {
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

  editQuestion() {
    
  }
}
