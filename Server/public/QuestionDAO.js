"use strict";
const DataSource_1 = require("./DataSource");
const Question_1 = require("./Question");
const OpenDataSource_1 = require("./OpenDataSource");
const OpenQuestion_1 = require("./OpenQuestion");
const MultipleDataSource_1 = require("./MultipleDataSource");
const MultipleQuestion_1 = require("./MultipleQuestion");
class QuestionDAO {
    static getAllQuestions(callback) {
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
exports.QuestionDAO = QuestionDAO;
