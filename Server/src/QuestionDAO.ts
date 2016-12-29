/// <reference path="DataSource.ts"/>
/// <reference path="Question.ts" />
/// <reference path="OpenQuestion.ts" />
/// <reference path="OpenDataSource.ts" />
/// <reference path="MultipleQuestion.ts" />
/// <reference path="MultipleDataSource.ts" />
/// <reference path="Questions.ts"/>
/// <reference path="QuestionDataSource.ts"/>

import { DataSource } from './DataSource';
import { Question } from './Question';
import { OpenDataSource } from './OpenDataSource';
import { OpenQuestion } from './OpenQuestion';
import { MultipleDataSource } from './MultipleDataSource';
import { MultipleQuestion } from './MultipleQuestion';
import { QuestionDataSource } from './QuestionDataSource';
import { Questions } from './Questions';

export class QuestionDAO {

    private static ds: DataSource = DataSource.getInstance();
    private static opends: OpenDataSource = OpenDataSource.getInstance();
    private static multds: MultipleDataSource = MultipleDataSource.getInstance();
    private static qds: QuestionDataSource = QuestionDataSource.getInstance();

    public static getAllQuestions(callback) {
        var questions: Array<Question> = new Array<Question>();
        this.ds.getDatabase().all("SELECT * FROM TB_QUESTIONS", function(err, rows) {
            for (var row of rows) {
                var q1 = new Question(row['id'], row['question'], row['answerA'], row['answerB'], row['answerC'], row['answerD'], row['correctAnswer']);
                questions.push(q1);
            }
            callback(questions);
        });
    }
    // lists all open questions
    public static getOpenQuestions(callback) {
        var openQs: Array<OpenQuestion> = new Array<OpenQuestion>();
        this.opends.getOpenDatabase().all("SELECT * FROM OpenQuestions;", function(err, rows) {
            for (var row of rows) {
                var q1 = new OpenQuestion(row['id'], row['category'], row['question'], row['correctAnswer']);
                openQs.push(q1);
            }
            callback(openQs);
        });
    }
    // lists open questions from a specific category
    public static getOpenQuestionsByCategory(cat: string, callback) {
        var openQs: Array<OpenQuestion> = new Array<OpenQuestion>();
        this.opends.getOpenDatabase().all("SELECT * FROM OpenQuestions WHERE category = '" + cat + "';", function(err, rows) {
            for (var row of rows) {
                var oq1 = new OpenQuestion(row['id'], row['category'], row['question'], row['correctAnswer']);
                openQs.push(oq1);
            }
            callback(openQs);
        });
    }
    // lists all available questions
    public static getQuestions(callback) {
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
      this.qds.getQuestionDatabase().all("SELECT * FROM QUESTIONS WHERE isMcq = 'true';", function(err, rows) {
          for (var row of rows) {
              var q1 = new Questions(row['id'], row['category'], row['isMcq'], row['question'], row['answerA'], row['answerB'],
                  row['answerC'], row['answerD'], row['correctAnswer']);
              questions.push(q1);
          }
          callback(questions);
      });
    }
    // lists all questions from one category
    public static getQuizQuestions(cat: string,amount: number, callback) {
      var questions: Array<Questions> = new Array<Questions>();
      this.qds.getQuestionDatabase().all("SELECT * FROM Questions WHERE category = '"+cat+"' ORDER BY RANDOM() LIMIT "+amount+";", function(err, rows) {
            for (var row of rows) {
                var q1 = new Questions(row['id'], row['category'], row['isMcq'], row['question'], row['answerA'], row['answerB'],
                    row['answerC'], row['answerD'], row['correctAnswer']);
                questions.push(q1);
            }
            callback(questions);
        });

    }
    // lists all multiple choice questions
    public static getMultQuestions(callback) {
        var multQs: Array<MultipleQuestion> = new Array<MultipleQuestion>();
        this.multds.getMultipleDatabase().all("SELECT * FROM MultipleQuestions", function(err, rows) {
            for (var row of rows) {
                var q1 = new MultipleQuestion(row['id'], row['category'], row['question'], row['answerA'],
                    row['answerB'], row['answerC'], row['answerD'], row['correctAnswer']);
                multQs.push(q1);
            }
            callback(multQs);
        });
    }
    // lists all multiple choice questions from a specific category
    public static getMultQuestionsByCategory(cat: string, callback) {
        var multQs: Array<MultipleQuestion> = new Array<MultipleQuestion>();
        this.multds.getMultipleDatabase().all("SELECT * FROM MultipleQuestions WHERE category = '" + cat + "'", function(err, rows) {
            for (var row of rows) {
                var q1 = new MultipleQuestion(row['id'], row['category'], row['question'], row['answerA'],
                    row['answerB'], row['answerC'], row['answerD'], row['correctAnswer']);
                multQs.push(q1);
            }
            callback(multQs);
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
    public static getQuestionById(id: number, callback) {
        var query = "SELECT * FROM TB_QUESTIONS WHERE id='" + id + "'";
        this.ds.getDatabase().get(query, function(err, row) {
            var question = new Question(row['id'], row['question'], row['answerA'], row['answerB'], row['answerC'], row['answerD'], row['correctAnswer']);
            callback(question);
        });
    }
}
