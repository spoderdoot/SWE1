
import {QuestionSuperClass} from './question.super.model';

//used for model of a MultipleChoiceQuestion
export class MultipleChoiceQuestion extends QuestionSuperClass {
  constructor(public id: number,
    public category: any, //each question has to have a category
    public question: string,
    public answerA: string,
    public answerB: string,
    public answerC: string,
    public answerD: string,
    public correctAnswer: number) { //number 1 to 4 for A, B, C and D answer
    super(id, category, question, correctAnswer);
  }
}
