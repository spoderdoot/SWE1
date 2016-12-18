"use strict";
class MultipleQuestion {
    constructor(questionID, subject, question, answerA, answerB, answerC, answerD, correctMultAnswer) {
        this.questionID = questionID;
        this.subject = subject;
        this.question = question;
        this.answerA = answerA;
        this.answerB = answerB;
        this.answerC = answerC;
        this.answerD = answerD;
        this.correctMultAnswer = correctMultAnswer;
    }
    ;
    get getQuestionID() {
        return this.questionID;
    }
    get getQuestion() {
        return this.question;
    }
    get getSubject() {
        return this.subject;
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
