
export abstract class QuestionSuperClass {
  constructor(public id: number,
    public category : any, //each question must have a category
    public question: string,
    public correctAnswer: any) {
}
}
