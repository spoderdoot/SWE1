"use strict";
class QuizRules {
    constructor(category, numberOfQuestions) {
        this.category = category;
        this.numberOfQuestions = numberOfQuestions;
    }
    get getCategory() {
        return this.category;
    }
    get getNumberOfQuestions() {
        return this.numberOfQuestions;
    }
}
exports.QuizRules = QuizRules;
