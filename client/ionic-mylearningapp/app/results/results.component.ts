import {Component} from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';
import { OpenQuestion, MultipleChoiceQuestion, Question, QuestionsService} from '../shared/index';
import { QuizRulesComponent } from '../quiz/index';

//used to show user the results of his played quiz
@Component({
  templateUrl: 'build/results/results.component.html',
  providers: [QuestionsService],
})
export class ResultsComponent {
  //some attributes that were saved earlier in local storage for re-use
  private username : string;
  private correctAnswerCount : string;
  private category : string;
  private numberOfQuestions : string;

  //grade and percentage correct to show user how well he did answering his questions
  private grade : number;
  private percentageCorrect : number;

  constructor(private alertCtrl: AlertController, public questionsService: QuestionsService, public navCtrl : NavController) {
      this.username = window.localStorage.getItem("username");
      this.correctAnswerCount = window.localStorage.getItem("correctAnswerCount");
      this.numberOfQuestions = window.localStorage.getItem("numberOfQuestions");
      this.category = window.localStorage.getItem("category");
      this.grade = 0;
      this.giveGrade();
  }

  giveGrade() {
    //changing strings to numbers
    var answered = +this.correctAnswerCount;
    console.log(answered);
    var total = +this.numberOfQuestions;
    console.log(total);
    this.percentageCorrect = (answered*100)/total;

    this.percentageCorrect = Math.ceil(this.percentageCorrect);
    console.log(this.percentageCorrect);
    /*
    //testing if grading works as intented
    answered = 1;
    console.log(answered);
    total = 1;
    console.log(total);
    */
    if(this.percentageCorrect == 100) {
      this.grade = 1;
    } else
    if(99 > this.percentageCorrect && this.percentageCorrect > 75) {
      this.grade = 2;
    } else
    if(74 > this.percentageCorrect && this.percentageCorrect > 60) {
      this.grade = 3;
    } else
    if(59 > this.percentageCorrect && this.percentageCorrect > 45) {
      this.grade = 4;
    } else
    if(44 > this.percentageCorrect && this.percentageCorrect > 35) {
      this.grade = 5;
    } else {
      console.log(this.percentageCorrect);
      this.grade = 6;
    }
  }

  //used to re-start the quiz
  redirectToQuizRules() {
    this.navCtrl.setRoot(QuizRulesComponent);
  }

}
