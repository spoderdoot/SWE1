"use strict";
const QuestionDataSource_1 = require("./QuestionDataSource");
const Question_1 = require("./Question");
class QuestionDAO {
    static getAllQuestions(callback) {
        var questions = new Array();
        this.qds.getQuestionDatabase().all("SELECT * FROM Questions;", function (err, rows) {
            for (var row of rows) {
                var q1 = new Question_1.Question(row['id'], row['category'], row['isMcq'], row['question'], row['answerA'], row['answerB'], row['answerC'], row['answerD'], row['correctAnswer']);
                questions.push(q1);
            }
            callback(questions);
        });
    }
    static getAllOpenQuestions(callback) {
        var questions = new Array();
        this.qds.getQuestionDatabase().all("SELECT * FROM QUESTIONS WHERE isMcq = 'false';", function (err, rows) {
            for (var row of rows) {
                var q1 = new Question_1.Question(row['id'], row['category'], row['isMcq'], row['question'], row['answerA'], row['answerB'], row['answerC'], row['answerD'], row['correctAnswer']);
                questions.push(q1);
            }
            callback(questions);
        });
    }
    static getAllMultipleChoiceQuestions(callback) {
        var questions = new Array();
        this.qds.getQuestionDatabase().all("SELECT * FROM Questions WHERE isMcq = 'true';", function (err, rows) {
            for (var row of rows) {
                var q1 = new Question_1.Question(row['id'], row['category'], row['isMcq'], row['question'], row['answerA'], row['answerB'], row['answerC'], row['answerD'], row['correctAnswer']);
                questions.push(q1);
                console.log("Question: " + q1);
            }
            callback(questions);
        });
    }
    static getQuizQuestions(quiz, callback) {
        var questions = new Array();
        this.qds.getQuestionDatabase().all("SELECT * FROM Questions WHERE category = '" + quiz.getCategory + "' ORDER BY RANDOM() LIMIT " + quiz.getNumberOfQuestions + ";", function (err, rows) {
            for (var row of rows) {
                var q1 = new Question_1.Question(row['id'], row['category'], row['isMcq'], row['question'], row['answerA'], row['answerB'], row['answerC'], row['answerD'], row['correctAnswer']);
                questions.push(q1);
                console.log(q1.getQuestion);
            }
            callback(questions);
        });
    }
    static getQuestionByCategory(cat, callback) {
        var questions = new Array();
        QuestionDAO.qds.getQuestionDatabase().all("SELECT * FROM Questions WHERE category = '" + cat.getCategory + "';", function (err, rows) {
            for (var row of rows) {
                var q1 = new Question_1.Question(row['id'], row['category'], row['isMcq'], row['question'], row['answerA'], row['answerB'], row['answerC'], row['answerD'], row['correctAnswer']);
                questions.push(q1);
                console.log(q1.getQuestion);
            }
            callback(questions);
        });
    }
    static createOpenQuestion(newQuestion) {
        var insert = "INSERT INTO Questions VALUES (NULL, '" + newQuestion.getCategory + "', 'false', '" + newQuestion.getQuestion + "', NULL, NULL, NULL, NULL, '" + newQuestion.getCorrectAnswer + "')";
        console.log(insert);
        return new Promise(function (resolve, reject) {
            QuestionDAO.qds.getQuestionDatabase().run(insert, function (err) {
                if (err) {
                    console.log("Failed \n" + err);
                    resolve(err);
                }
                else {
                    console.log("Success " + this.lastID);
                    resolve(this.lastID);
                }
            });
        });
    }
    static createMultipleChoiceQuestion(newQuestion) {
        var insert = "INSERT INTO Questions VALUES (NULL, '" + newQuestion.getCategory + "', 'true', '" + newQuestion.getQuestion + "', '" + newQuestion.getAnswerA + "', '" + newQuestion.getAnswerB + "', " +
            "'" + newQuestion.getAnswerC + "', '" + newQuestion.getAnswerD + "', '" + newQuestion.getCorrectAnswer + "');";
        console.log(insert);
        return new Promise(function (resolve, reject) {
            QuestionDAO.qds.getQuestionDatabase().run(insert, function (err) {
                if (err) {
                    console.log("Failed \n" + err);
                    resolve(err);
                }
                else {
                    console.log("Success " + this.lastID);
                    resolve(this.lastID);
                }
            });
        });
    }
    static getQuestionByID(id, callback) {
        var insert = "SELECT * FROM  Questions WHERE id = '" + id + "';";
        var question = new Array();
        this.qds.getQuestionDatabase().get(insert, function (err, rows) {
            for (var row of rows) {
                var q1 = new Question_1.Question(row['id'], row['category'], row['isMcq'], row['question'], row['answerA'], row['answerB'], row['answerC'], row['answerD'], row['correctAnswer']);
                question.push(q1);
                console.log(q1.getQuestion);
            }
            callback(question);
        });
    }
    static updateQuestion(upQuestion) {
        var insert = "UPDATE Users SET id = " + upQuestion.getID +
            ", category = '" + upQuestion.getCategory + "', isMcq = '" + upQuestion.getType +
            "', question = '" + upQuestion.getQuestion + "', answerA = '" + upQuestion.getAnswerA +
            "', answerB = '" + upQuestion.getAnswerB + "', answerC = '" + upQuestion.getAnswerC +
            "', answerD = '" + upQuestion.getAnswerD + "', correctAnswer = '" + upQuestion.getCorrectAnswer +
            "' WHERE id = " + upQuestion.getID + ";";
        console.log(insert);
        return new Promise(function (resolve, reject) {
            QuestionDAO.qds.getQuestionDatabase().run(insert, function (err) {
                if (err) {
                    console.log("Failed \n" + err);
                    resolve(err);
                }
                else {
                    console.log("Success " + upQuestion.getID);
                    resolve(upQuestion.getID);
                }
            });
        });
    }
}
QuestionDAO.qds = QuestionDataSource_1.QuestionDataSource.getInstance();
exports.QuestionDAO = QuestionDAO;
