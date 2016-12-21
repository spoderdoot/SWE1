
import {QuestionSuperClass} from './question.super.model'; //doesnt work with index WTH
//model of an open question
export class OpenQuestion extends QuestionSuperClass {
  constructor(
       id: number,
       category : any, //each question must have a category
       question: string,
       correctOpenAnswer: string) {

  super(id, category, question, correctOpenAnswer);
  }

}
