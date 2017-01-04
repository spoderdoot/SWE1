/// <reference path="DataSource.ts"/>
/// <reference path="Question.ts" />
/// <reference path="Questions.ts"/>
/// <reference path="QuestionDataSource.ts"/>
/// <reference path="QuizRules.ts" />
/// <reference path="Category.ts" />

import { DataSource } from './DataSource';
import { Question } from './Question';
import { QuestionDataSource } from './QuestionDataSource';
import { Questions } from './Questions';
import { QuizRules } from './QuizRules';
import { Category } from './Category';

export class QuestionDAO {

    private static ds: DataSource = DataSource.getInstance();
    private static qds: QuestionDataSource = QuestionDataSource.getInstance();

    public static getQuestions(callback) {
        var questions: Array<Question> = new Array<Question>();
        this.ds.getDatabase().all("SELECT * FROM TB_QUESTIONS", function(err, rows) {
            for (var row of rows) {
                var q1 = new Question(row['id'], row['question'], row['answerA'], row['answerB'], row['answerC'], row['answerD'], row['correctAnswer']);
                questions.push(q1);
            }
            callback(questions);
        });
    }
    // lists all available questions
    public static getAllQuestions(callback) {
        var questions: Array<Questions> = new Array<Questions>();
        this.qds.getQuestionDatabase().all("SELECT * FROM Questions;", function(err, rows) {
            for (var row of rows) {
                var q1 = new Questions(row['id'], row['category'], row['isMcq'], row['question'], row['answerA'], row['answerB'],
                    row['answerC'], row['answerD'], row['correctAnswer']);
                questions.push(q1);
            }
            callback(questions);
        });
    }
    // lists all open questions
    public static getAllOpenQuestions(callback) {
        var questions: Array<Questions> = new Array<Questions>();
        this.qds.getQuestionDatabase().all("SELECT * FROM QUESTIONS WHERE isMcq = 'false';", function(err, rows) {
            for (var row of rows) {
                var q1 = new Questions(row['id'], row['category'], row['isMcq'], row['question'], row['answerA'], row['answerB'],
                    row['answerC'], row['answerD'], row['correctAnswer']);
                questions.push(q1);
            }
            callback(questions);
        });
    }
    // lists all multiple choice questions
    public static getAllMultipleChoiceQuestions(callback) {
        var questions: Array<Questions> = new Array<Questions>();
        this.qds.getQuestionDatabase().all("SELECT * FROM Questions WHERE isMcq = 'true';", function(err, rows) {
            for (var row of rows) {
                var q1 = new Questions(row['id'], row['category'], row['isMcq'], row['question'], row['answerA'], row['answerB'],
                    row['answerC'], row['answerD'], row['correctAnswer']);
                questions.push(q1);
            }
            callback(questions);
        });
    }
    // lists all questions from one category
    public static getQuizQuestions(quiz: QuizRules, callback) {
        var questions: Array<Questions> = new Array<Questions>();
        this.qds.getQuestionDatabase().all("SELECT * FROM Questions WHERE category = '" + quiz.getCategory + "' ORDER BY RANDOM() LIMIT " + quiz.getNumberOfQuestions + ";", function(err, rows) {
            for (var row of rows) {
                var q1 = new Questions(row['id'], row['category'], row['isMcq'], row['question'], row['answerA'], row['answerB'],
                    row['answerC'], row['answerD'], row['correctAnswer']);
                questions.push(q1);
                console.log(q1.getQuestion);
            }
            callback(questions);
        });

    }
    // lists all available questions from a specific category
    public static getQuestionByCategory(cat: Category, callback) {
        var questions: Array<Questions> = new Array<Questions>();
        QuestionDAO.qds.getQuestionDatabase().all("SELECT * FROM Questions WHERE category = '" + cat.getCategory + "';", function(err, rows) {
            for (var row of rows) {
                var q1 = new Questions(row['id'], row['category'], row['isMcq'], row['question'], row['answerA'], row['answerB'],
                    row['answerC'], row['answerD'], row['correctAnswer']);
                questions.push(q1);
                console.log(q1.getQuestion);
            }
            callback(questions);
        });
    }
    public static createQuestion(newQuestion: Question): Promise<number> {
        var insert: string = "INSERT INTO TB_QUESTIONS VALUES (NULL, '" + newQuestion.getQuestion
            + "', '" + newQuestion.getAnswerA
            + "', '" + newQuestion.getAnswerB
            + "', '" + newQuestion.getAnswerC
            + "', '" + newQuestion.getAnswerD
            + "', " + newQuestion.getCorrectAnswer + ")";
        console.log(insert);
        return new Promise(function(resolve, reject) {
            QuestionDAO.ds.getDatabase().run(insert, function(err) {
                if (err) {
                    console.log("Failed");
                    reject(err);
                } else {
                    console.log("Success " + this.lastID);
                    resolve(this.lastID);
                }
            });
        });
    }
    // creates a new open question
    public static createOpenQuestion(newQuestion: Questions): Promise<number> {
        var insert: string = "INSERT INTO Questions VALUES (NULL, '" + newQuestion.getCategory + "', 'false', '" + newQuestion.getQuestion + "', NULL, NULL, NULL, NULL, '" + newQuestion.getCorrectAnswer + "')"
        console.log(insert);
        return new Promise(function(resolve, reject) {
            QuestionDAO.qds.getQuestionDatabase().run(insert, function(err) {
                if (err) {
                    console.log("Failed");
                    console.log(err);
                    resolve(err);
                } else {
                    console.log("Success " + this.lastID);
                    resolve(this.lastID);
                }
            })
        })
    }
    public static createMultipleChoiceQuestion(newQuestion: Questions): Promise<number> {
        var insert: string = "INSERT INTO Questions VALUES (NULL, '" + newQuestion.getCategory + "', 'true', '" + newQuestion.getQuestion + "', '" + newQuestion.getAnswerA + "', '" + newQuestion.getAnswerB + "', " +
            "'" + newQuestion.getAnswerC + "', '" + newQuestion.getAnswerD + "', '" + newQuestion.getCorrectAnswer + "');"
        console.log(insert);
        return new Promise(function(resolve, reject) {
            QuestionDAO.qds.getQuestionDatabase().run(insert, function(err) {
                if (err) {
                    console.log("Failed");
                    console.log(err);
                    resolve(err);
                } else {
                    console.log("Success " + this.lastID);
                    resolve(this.lastID);
                }
            })
        })
    }
    public static getQuestionById(id: number, callback) {
        var query = "SELECT * FROM TB_QUESTIONS WHERE id='" + id + "'";
        this.ds.getDatabase().get(query, function(err, row) {
            var question = new Question(row['id'], row['question'], row['answerA'], row['answerB'], row['answerC'], row['answerD'], row['correctAnswer']);
            callback(question);
        });
    }
}
