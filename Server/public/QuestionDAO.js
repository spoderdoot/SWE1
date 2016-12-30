"use strict";
const DataSource_1 = require("./DataSource");
const Question_1 = require("./Question");
const OpenDataSource_1 = require("./OpenDataSource");
const OpenQuestion_1 = require("./OpenQuestion");
const MultipleDataSource_1 = require("./MultipleDataSource");
const MultipleQuestion_1 = require("./MultipleQuestion");
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
    static getOpenQuestions(callback) {
        var openQs = new Array();
        this.opends.getOpenDatabase().all("SELECT * FROM OpenQuestions;", function (err, rows) {
            for (var row of rows) {
                var q1 = new OpenQuestion_1.OpenQuestion(row['id'], row['category'], row['question'], row['correctAnswer']);
                openQs.push(q1);
            }
            callback(openQs);
        });
    }
    static getOpenQuestionsByCategory(cat, callback) {
        var openQs = new Array();
        this.opends.getOpenDatabase().all("SELECT * FROM OpenQuestions WHERE category = '" + cat + "';", function (err, rows) {
            for (var row of rows) {
                var oq1 = new OpenQuestion_1.OpenQuestion(row['id'], row['category'], row['question'], row['correctAnswer']);
                openQs.push(oq1);
            }
            callback(openQs);
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
    static getMultQuestions(callback) {
        var multQs = new Array();
        this.multds.getMultipleDatabase().all("SELECT * FROM MultipleQuestions", function (err, rows) {
            for (var row of rows) {
                var q1 = new MultipleQuestion_1.MultipleQuestion(row['id'], row['category'], row['question'], row['answerA'], row['answerB'], row['answerC'], row['answerD'], row['correctAnswer']);
                multQs.push(q1);
            }
            callback(multQs);
        });
    }
    static getMultQuestionsByCategory(cat, callback) {
        var multQs = new Array();
        this.multds.getMultipleDatabase().all("SELECT * FROM MultipleQuestions WHERE category = '" + cat + "'", function (err, rows) {
            for (var row of rows) {
                var q1 = new MultipleQuestion_1.MultipleQuestion(row['id'], row['category'], row['question'], row['answerA'], row['answerB'], row['answerC'], row['answerD'], row['correctAnswer']);
                multQs.push(q1);
            }
            callback(multQs);
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
QuestionDAO.opends = OpenDataSource_1.OpenDataSource.getInstance();
QuestionDAO.multds = MultipleDataSource_1.MultipleDataSource.getInstance();
QuestionDAO.qds = QuestionDataSource_1.QuestionDataSource.getInstance();
exports.QuestionDAO = QuestionDAO;
