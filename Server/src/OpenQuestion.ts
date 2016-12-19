export class OpenQuestion {

    constructor(private questionID: number, private subject: number,
        private question: string, private correctOpenAnswer: string) {
    }
    
    public get getQuestion() {
        return this.question;
    }
    public get getID() {
        return this.questionID;
    }
    public get getSubject() {
        return this.subject;
    }
    public get correctAnswer() {
        return this.correctAnswer;
    }
}
