export class QuizRules {
    constructor(private category: string, private numberOfQuestions: string) { }

    public get getCategory() {
        return this.category;
    }
    public get getNumberOfQuestions() {
        return this.numberOfQuestions;
    }
}
