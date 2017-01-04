"use strict";
const DataSource_1 = require("./DataSource");
const Question_1 = require("./Question");
const QuestionDataSource_1 = require("./QuestionDataSource");
const Questions_1 = require("./Questions");
class QuestionDAO {
    static getQuestions(callback) {
        var questions = new Array();
        this.ds.getDatabase().all("SELECT * FROM TB_QUESTIONS", function (err, rows) {
            for (var row of rows) {
                var q1 = new Question_1.Question(row['id'], row['question'], row['answerA'], row['answerB'], row['answerC'], row['answerD'], row['correctAnswer']);
                questions.push(q1);
            }
            callback(questions);
        });
    }
    static getAllQuestions(callback) {
        var questions = new Array();
        this.qds.getQuestionDatabase().all("SELECT * FROM Questions;", function (err, rows) {
            for (var row of rows) {
                var q1 = new Questions_1.Questions(row['id'], row['category'], row['isMcq'], row['question'], row['answerA'], row['answerB'], row['answerC'], row['answerD'], row['correctAnswer']);
                questions.push(q1);
            }
            callback(questions);
        });
    }
    static getAllOpenQuestions(callback) {
        var questions = new Array();
        this.qds.getQuestionDatabase().all("SELECT * FROM QUESTIONS WHERE isMcq = 'false';", function (err, rows) {
            for (var row of rows) {
                var q1 = new Questions_1.Questions(row['id'], row['category'], row['isMcq'], row['question'], row['answerA'], row['answerB'], row['answerC'], row['answerD'], row['correctAnswer']);
                questions.push(q1);
            }
            callback(questions);
        });
    }
    static getAllMultipleChoiceQuestions(callback) {
        var questions = new Array();
        this.qds.getQuestionDatabase().all("SELECT * FROM Questions WHERE isMcq = 'true';", function (err, rows) {
            for (var row of rows) {
                var q1 = new Questions_1.Questions(row['id'], row['category'], row['isMcq'], row['question'], row['answerA'], row['answerB'], row['answerC'], row['answerD'], row['correctAnswer']);
                questions.push(q1);
            }
            callback(questions);
        });
    }
    static getQuizQuestions(quiz, callback) {
        var questions = new Array();
        this.qds.getQuestionDatabase().all("SELECT * FROM Questions WHERE category = '" + quiz.getCategory + "' ORDER BY RANDOM() LIMIT " + quiz.getNumberOfQuestions + ";", function (err, rows) {
            for (var row of rows) {
                var q1 = new Questions_1.Questions(row['id'], row['category'], row['isMcq'], row['question'], row['answerA'], row['answerB'], row['answerC'], row['answerD'], row['correctAnswer']);
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
                var q1 = new Questions_1.Questions(row['id'], row['category'], row['isMcq'], row['question'], row['answerA'], row['answerB'], row['answerC'], row['answerD'], row['correctAnswer']);
                questions.push(q1);
                console.log(q1.getQuestion);
            }
            callback(questions);
        });
    }
    static createQuestion(newQuestion) {
        var insert = "INSERT INTO TB_QUESTIONS VALUES (NULL, '" + newQuestion.getQuestion
            + "', '" + newQuestion.getAnswerA
            + "', '" + newQuestion.getAnswerB
            + "', '" + newQuestion.getAnswerC
            + "', '" + newQuestion.getAnswerD
            + "', " + newQuestion.getCorrectAnswer + ")";
        console.log(insert);
        return new Promise(function (resolve, reject) {
            QuestionDAO.ds.getDatabase().run(insert, function (err) {
                if (err) {
                    console.log("Failed");
                    reject(err);
                }
                else {
                    console.log("Success " + this.lastID);
                    resolve(this.lastID);
                }
            });
        });
    }
    static createOpenQuestion(newQuestion) {
        var insert = "INSERT INTO Questions VALUES (NULL, '" + newQuestion.getCategory + "', 'false', '" + newQuestion.getQuestion + "', NULL, NULL, NULL, NULL, '" + newQuestion.getCorrectAnswer + "')";
        console.log(insert);
        return new Promise(function (resolve, reject) {
            QuestionDAO.qds.getQuestionDatabase().run(insert, function (err) {
                if (err) {
                    console.log("Failed");
                    console.log(err);
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
                    console.log("Failed");
                    console.log(err);
                    resolve(err);
                }
                else {
                    console.log("Success " + this.lastID);
                    resolve(this.lastID);
                }
            });
        });
    }
    static getQuestionById(id, callback) {
        var query = "SELECT * FROM TB_QUESTIONS WHERE id='" + id + "'";
        this.ds.getDatabase().get(query, function (err, row) {
            var question = new Question_1.Question(row['id'], row['question'], row['answerA'], row['answerB'], row['answerC'], row['answerD'], row['correctAnswer']);
            callback(question);
        });
    }
}
QuestionDAO.ds = DataSource_1.DataSource.getInstance();
QuestionDAO.qds = QuestionDataSource_1.QuestionDataSource.getInstance();
exports.QuestionDAO = QuestionDAO;
