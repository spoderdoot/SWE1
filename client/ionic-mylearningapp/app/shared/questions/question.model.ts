export class Question {
  constructor(public id: number,
    public question: string,
    public answerA: string,
    public answerB: string,
    public answerC: string,
    public answerD: string,
    public correctAnswer: number) {
  }

  //Multiple constructors are NOT allowed! =( 
/*  constructor(public id:number,
    public question : string,
    public inputField : string,
    public correctAnswer : number,
  ) {
  } */
}
