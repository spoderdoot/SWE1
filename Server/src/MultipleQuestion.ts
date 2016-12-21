export class MultipleQuestion {

    constructor(private id: number, private category: string,
        private question: string, private answerA: string, private answerB: string,
        private answerC: string, private answerD: string, private correctMultAnswer: string) {
    };

    public get getQuestionID() {
        return this.id;
    }
    public get getQuestion() {
        return this.question;
    }
    public get getSubject() {
        return this.category;
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
        return this.correctMultAnswer;
    }
}
