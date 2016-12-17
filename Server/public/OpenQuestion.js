"use strict";
class OpenQuestion {
    constructor(questionID, subject, question, correctOpenAnswer) {
        this.questionID = questionID;
        this.subject = subject;
        this.question = question;
        this.correctOpenAnswer = correctOpenAnswer;
    }
    get getQuestion() {
        return this.question;
    }
    get getID() {
        return this.questionID;
    }
    get getSubject() {
        return this.subject;
    }
    get correctAnswer() {
        return this.correctAnswer;
    }
}
exports.OpenQuestion = OpenQuestion;
