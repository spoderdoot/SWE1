//MultipleChoiceQuestion
export class MultipleChoiceQuestion {
  constructor(public id: number,
    public question: string,
    public answerA: string,
    public answerB: string,
    public answerC: string,
    public answerD: string,
    public correctAnswer: number) {
  }
}
