export class OpenQuestion {

    constructor(private id: number, private category: string,
        private question: string, private correctOpenAnswer: string) {
    }

    public get getQuestion() {
        return this.question;
    }
    public get getID() {
        return this.id;
    }
    public get getSubject() {
        return this.category;
    }
    public get correctAnswer() {
        return this.correctAnswer;
    }
}
