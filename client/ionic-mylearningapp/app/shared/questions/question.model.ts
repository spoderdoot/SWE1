//was given to work with - model of a question
export class Question {
  constructor(public id: number,
    public question: string,
    public answerA: string,
    public answerB: string,
    public answerC: string,
    public answerD: string,
    public correctAnswer: number) {
  }
}
