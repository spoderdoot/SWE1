"use strict";
class MultipleQuestion {
    constructor(id, category, question, answerA, answerB, answerC, answerD, correctMultAnswer) {
        this.id = id;
        this.category = category;
        this.question = question;
        this.answerA = answerA;
        this.answerB = answerB;
        this.answerC = answerC;
        this.answerD = answerD;
        this.correctMultAnswer = correctMultAnswer;
    }
    ;
    get getQuestionID() {
        return this.id;
    }
    get getQuestion() {
        return this.question;
    }
    get getSubject() {
        return this.category;
    }
    get getAnswerA() {
        return this.answerA;
    }
    get getAnswerB() {
        return this.answerB;
    }
    get getAnswerC() {
        return this.answerC;
    }
    get getAnswerD() {
        return this.answerD;
    }
    get getCorrectAnswer() {
        return this.correctMultAnswer;
    }
}
exports.MultipleQuestion = MultipleQuestion;
