"use strict";
class Question {
    constructor(id, category, isMcq, question, answerA, answerB, answerC, answerD, correctAnswer) {
        this.id = id;
        this.category = category;
        this.isMcq = isMcq;
        this.question = question;
        this.answerA = answerA;
        this.answerB = answerB;
        this.answerC = answerC;
        this.answerD = answerD;
        this.correctAnswer = correctAnswer;
    }
    get getID() {
        return this.id;
    }
    get getCategory() {
        return this.category;
    }
    get getType() {
        return this.isMcq;
    }
    get getQuestion() {
        return this.question;
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
