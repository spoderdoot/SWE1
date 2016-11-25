"use strict";
class Question {
    constructor(id, question, answerA, answerB, answerC, answerD, correctAnswer) {
        this.id = id;
        this.question = question;
        this.answerA = answerA;
        this.answerB = answerB;
        this.answerC = answerC;
        this.answerD = answerD;
        this.correctAnswer = correctAnswer;
    }
    get getQuestion() {
        return this.question;
    }
    get getId() {
        return this.id;
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
        return this.correctAnswer;
    }
}
exports.Question = Question;
