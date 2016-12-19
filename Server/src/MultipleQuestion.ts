export class MultipleQuestion {

    constructor(private questionID: number, private subject: number,
        private question: string, private answerA: string, private answerB: string,
        private answerC: string, private answerD: string, private correctMultAnswer: string) {
    };
    
    public get getQuestionID() {
        return this.questionID;
    }
    public get getQuestion() {
        return this.question;
    }
    public get getSubject() {
        return this.subject;
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
