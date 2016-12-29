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
      this.giveGrade();
  }

  giveGrade() {
    //changing strings to numbers
    var answered = +this.correctAnswerCount;
    console.log(answered);
    var total = +this.numberOfQuestions;
    console.log(total);
    this.percentageCorrect = (answered*100)/total;
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
    }
    if(99 > this.percentageCorrect && this.percentageCorrect > 80) {
      this.grade = 2;
    }
    if(79 > this.percentageCorrect && this.percentageCorrect > 65) {
      this.grade = 3;
    }
    if(64 > this.percentageCorrect && this.percentageCorrect > 50) {
      this.grade = 4;
    }
    if(49 > this.percentageCorrect && this.percentageCorrect > 35) {
      this.grade = 5;
    } else {
      this.grade = 6;
    }
  }

  //used to re-start the quiz
  redirectToQuizRules() {
    this.navCtrl.setRoot(QuizRulesComponent);
  }

}
