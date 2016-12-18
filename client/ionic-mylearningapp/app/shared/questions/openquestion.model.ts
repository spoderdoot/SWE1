//model of an open question
export class OpenQuestion {
  constructor(public id: number,
    public category : any, //each question must have a category
    public question: string,
    public correctAnswer: string) {
  }
}
