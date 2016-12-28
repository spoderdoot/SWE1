export class GeneralQuestion {
  constructor(public id: number,
    public category : any,
    public questionType : string,
    public question: string,
    public answerA: string,
    public answerB: string,
    public answerC: string,
    public answerD: string,
    public correctAnswer: string) {}
}
