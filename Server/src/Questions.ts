export class Questions {

    constructor(private id: number, private category: string, private isMcq: string,
      private question: string, private answerA: string,private answerB: string,
      private answerC: string, private answerD: string, private correctAnswer: string) {
    }

    public get getID() {
        return this.id;
    }
    public get getCategory() {
        return this.category;
    }
    public get getQuestion() {
        return this.question;
    }
    public get getAnswerA() {
        return this.answerA;
    }
    public get getAnswerB() {
        return this.answerB;
    }
    public get getAnswerC() {
        return this.answerC;
    }
    public get getAnswerD() {
        return this.answerD;
    }
    public get getCorrectAnswer() {
        return this.correctAnswer;
    }
}
