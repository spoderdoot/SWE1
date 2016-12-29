//used for how a question looks
export class GeneralQuestion {
  constructor(public id: number,
    public category : any,
    public isMCQ : string,
    public question: string,
    public answerA: string,
    public answerB: string,
    public answerC: string,
    public answerD: string,
    public correctAnswer: string) {}
}
