export class Question {

    constructor(private id: number, private question: string, private answerA: string, private answerB: string,
        private answerC: string, private answerD: string, private correctAnswer: number) {
    }

    public get getQuestion() {
        return this.question;
    }
    public get getId() {
        return this.id;
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
