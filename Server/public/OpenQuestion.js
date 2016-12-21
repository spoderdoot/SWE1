"use strict";
class OpenQuestion {
    constructor(id, category, question, correctOpenAnswer) {
        this.id = id;
        this.category = category;
        this.question = question;
        this.correctOpenAnswer = correctOpenAnswer;
    }
    get getQuestion() {
        return this.question;
    }
    get getID() {
        return this.id;
    }
    get getSubject() {
        return this.category;
    }
    get correctAnswer() {
        return this.correctAnswer;
    }
}
exports.OpenQuestion = OpenQuestion;
