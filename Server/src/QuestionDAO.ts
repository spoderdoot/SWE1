/// <reference path="Question.ts"/>
/// <reference path="QuestionDataSource.ts"/>
/// <reference path="QuizRules.ts" />
/// <reference path="Category.ts" />

import { QuestionDataSource } from './QuestionDataSource';
import { Question } from './Question';
import { QuizRules } from './QuizRules';
import { Category } from './Category';

/**
 * This class is the connection between the REST-api and the question database
 *
 * @author Fernando Francisco Pfennig
 */
export class QuestionDAO {

    // Sets the datasource qds to the available instance of a question database
    private static qds: QuestionDataSource = QuestionDataSource.getInstance();

    // Lists all available questions
    public static getAllQuestions(callback) {
        var questions: Array<Question> = new Array<Question>();
        this.qds.getQuestionDatabase().all("SELECT * FROM Questions;", function(err, rows) {
            for (var row of rows) {
                var q1 = new Question(row['id'], row['category'], row['isMcq'], row['question'], row['answerA'], row['answerB'],
                    row['answerC'], row['answerD'], row['correctAnswer']);
                questions.push(q1);
            }
            callback(questions);
        });
    }
    // Lists all open questions
    public static getAllOpenQuestions(callback) {
        var questions: Array<Question> = new Array<Question>();
        this.qds.getQuestionDatabase().all("SELECT * FROM QUESTIONS WHERE isMcq = 'false';", function(err, rows) {
            for (var row of rows) {
                var q1 = new Question(row['id'], row['category'], row['isMcq'], row['question'], row['answerA'], row['answerB'],
                    row['answerC'], row['answerD'], row['correctAnswer']);
                questions.push(q1);
            }
            callback(questions);
        });
    }
    // Lists all multiple choice questions
    public static getAllMultipleChoiceQuestions(callback) {
        var questions: Array<Question> = new Array<Question>();
        this.qds.getQuestionDatabase().all("SELECT * FROM Questions WHERE isMcq = 'true';", function(err, rows) {
            for (var row of rows) {
                var q1 = new Question(row['id'], row['category'], row['isMcq'], row['question'], row['answerA'], row['answerB'],
                    row['answerC'], row['answerD'], row['correctAnswer']);
                questions.push(q1);
                console.log("Question: " + q1);
            }
            callback(questions);
        });
    }
    // Lists all questions from one category
    public static getQuizQuestions(quiz: QuizRules, callback) {
        var questions: Array<Question> = new Array<Question>();
        this.qds.getQuestionDatabase().all("SELECT * FROM Questions WHERE category = '" + quiz.getCategory + "' ORDER BY RANDOM() LIMIT " + quiz.getNumberOfQuestions + ";", function(err, rows) {
            for (var row of rows) {
                var q1 = new Question(row['id'], row['category'], row['isMcq'], row['question'], row['answerA'], row['answerB'],
                    row['answerC'], row['answerD'], row['correctAnswer']);
                questions.push(q1);
                console.log(q1.getQuestion);
            }
            callback(questions);
        });
    }
    // Lists all available questions from a specific category
    public static getQuestionByCategory(cat: Category, callback) {
        var questions: Array<Question> = new Array<Question>();
        QuestionDAO.qds.getQuestionDatabase().all("SELECT * FROM Questions WHERE category = '" + cat.getCategory + "';", function(err, rows) {
            for (var row of rows) {
                var q1 = new Question(row['id'], row['category'], row['isMcq'], row['question'], row['answerA'], row['answerB'],
                    row['answerC'], row['answerD'], row['correctAnswer']);
                questions.push(q1);
                console.log(q1.getQuestion);
            }
            callback(questions);
        });
    }
    // Creates a new open question
    public static createOpenQuestion(newQuestion: Question): Promise<number> {
        var insert: string = "INSERT INTO Questions VALUES (NULL, '" + newQuestion.getCategory + "', 'false', '" + newQuestion.getQuestion + "', NULL, NULL, NULL, NULL, '" + newQuestion.getCorrectAnswer + "')"
        console.log(insert);
        return new Promise(function(resolve, reject) {
            QuestionDAO.qds.getQuestionDatabase().run(insert, function(err) {
                if (err) {
                    console.log("Failed \n" + err);
                    resolve(err);
                } else {
                    console.log("Success " + this.lastID);
                    resolve(this.lastID);
                }
            })
        })
    }
    // Creates a new multiple choice question
    public static createMultipleChoiceQuestion(newQuestion: Question): Promise<number> {
        var insert: string = "INSERT INTO Questions VALUES (NULL, '" + newQuestion.getCategory + "', 'true', '" + newQuestion.getQuestion + "', '" + newQuestion.getAnswerA + "', '" + newQuestion.getAnswerB + "', " +
            "'" + newQuestion.getAnswerC + "', '" + newQuestion.getAnswerD + "', '" + newQuestion.getCorrectAnswer + "');"
        console.log(insert);
        return new Promise(function(resolve, reject) {
            QuestionDAO.qds.getQuestionDatabase().run(insert, function(err) {
                if (err) {
                    console.log("Failed \n" + err);
                    resolve(err);
                } else {
                    console.log("Success " + this.lastID);
                    resolve(this.lastID);
                }
            })
        })
    }
    // Selects a question belonging to an ID
    public static getQuestionByID(id: number, callback) {
        var insert: string = "SELECT * FROM  Questions WHERE id = '" + id + "';";
        var question: Array<Question> = new Array<Question>();
        this.qds.getQuestionDatabase().get(insert, function(err, rows) {
            for (var row of rows) {
                var q1 = new Question(row['id'], row['category'], row['isMcq'], row['question'], row['answerA'], row['answerB'],
                    row['answerC'], row['answerD'], row['correctAnswer']);
                question.push(q1);
                console.log(q1.getQuestion);
            }
            callback(question);
        })
    }
    // Updates an existing question with the given information (not tested yet)
    public static updateQuestion(upQuestion: Question): Promise<number> {
        var insert: string = "UPDATE Questions SET id = " + upQuestion.getID +
            ", category = '" + upQuestion.getCategory  +
            "', question = '" + upQuestion.getQuestion + "', answerA = '" + upQuestion.getAnswerA +
            "', answerB = '" + upQuestion.getAnswerB + "', answerC = '" + upQuestion.getAnswerC +
            "', answerD = '" + upQuestion.getAnswerD + "', correctAnswer = '" + upQuestion.getCorrectAnswer +
            "' WHERE id = " + upQuestion.getID + ";";
        console.log(insert);
        return new Promise(function(resolve, reject) {
            QuestionDAO.qds.getQuestionDatabase().run(insert, function(err) {
                if (err) {
                    console.log("Failed \n" + err);
                    resolve(err);
                } else {
                    console.log("Success " + upQuestion.getID);
                    resolve(upQuestion.getID);
                }
            })
        })
    }
}
