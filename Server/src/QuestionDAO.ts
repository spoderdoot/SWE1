/// <reference path="DataSource.ts"/>
/// <reference path="Question.ts" />
/// <reference path="OpenQuestion.ts" />
/// <reference path="OpenDataSource.ts" />

import { DataSource } from './DataSource';
import { Question } from './Question';
import { OpenDataSource } from './OpenDataSource';
import { OpenQuestion } from './OpenQuestion';

export class QuestionDAO {

    private static ds : DataSource = DataSource.getInstance();
    private static opends : OpenDataSource = OpenDataSource.getInstance();

    public static getAllQuestions(callback) {
      var questions : Array<Question> = new Array<Question>();
      this.ds.getDatabase().all("SELECT * FROM TB_QUESTIONS", function (err, rows) {
         for (var row of rows) {
           var q1 = new Question(row['questionID'], row['QUESTION'],row['answerA'],row['answerB'], row['answerC'], row['answerD'], row['CORRECTANSWER']);
           questions.push(q1);
         }
         callback(questions);
      });
    }
    public static createQuestion(newQuestion : Question) : Promise<number> {
      var insert : string = "INSERT INTO TB_QUESTIONS VALUES (NULL, '" + newQuestion.getQuestion
                             + "', '" + newQuestion.getAnswerA
                             + "', '" + newQuestion.getAnswerB
                             + "', '" + newQuestion.getAnswerC
                             + "', '" + newQuestion.getAnswerD
                             + "', " + newQuestion.getCorrectAnswer + ")";
      console.log(insert);
        return new Promise(function(resolve, reject) {
          QuestionDAO.ds.getDatabase().run(insert, function(err) {
            if(err) {
              console.log("Failed");
              reject (err);
            } else {
              console.log("Success " + this.lastID);
              resolve(this.lastID);
            }
          });
        });
    }

    public static getQuestionById(id : number, callback) {
      var query = "SELECT * FROM TB_QUESTIONS WHERE id='" + id +"'";
      this.ds.getDatabase().get(query, function(err, row) {
        var question = new Question(row['id'], row['question'], row['answerA'], row['answerB'], row['answerC'], row['answerD'], row['correctAnswer']);
        callback(question);
      });
    }


}
