//only used for quiz component to get both: multiple choice questions and open questions a little bit easier
export class GeneralQuestion {
  constructor(public id: number,
    public category: any,
    public isMcq: string,
    public question: string,
    public answerA: string,
    public answerB: string,
    public answerC: string,
    public answerD: string,
    public correctAnswer: string) { }
}
