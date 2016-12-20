
//mport {QuestionSuperClass} from './index';
//model of an open question
export class OpenQuestion {//extends QuestionSuperClass {
  constructor(
    public id: number,
      public category : any, //each question must have a category
      public question: string,
      public correctAnswer: string) {

  //super(id, category, question, correctAnswer);
  }

}
