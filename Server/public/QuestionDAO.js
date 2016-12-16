"use strict";
const DataSource_1 = require("./DataSource");
const Question_1 = require("./Question");
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
exports.QuestionDAO = QuestionDAO;
