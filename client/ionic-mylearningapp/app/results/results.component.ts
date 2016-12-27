import {Component} from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';
import { OpenQuestion, MultipleChoiceQuestion, Question, QuestionsService} from '../shared/index';
import { QuizRulesComponent } from '../quiz/index';

@Component({
  templateUrl: 'build/results/results.component.html',
  providers: [QuestionsService],
})
export class ResultsComponent {
  private username : string;
  private correctAnswerCount : string;
  private category : string;
  private numberOfQuestions : string;
  private grade : number;

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

    /*
    //testing if grading works as intented
    answered = 1;
    console.log(answered);
    total = 1;
    console.log(total);
    */
    if(answered == total) {
      this.grade = 1;
    }
    if(0.99 > answered/total && answered/total > 0.8) {
      this.grade = 2;
    }
    if(0.79 > answered/total && answered/total > 0.65) {
      this.grade = 3;
    }
    if(0.64 > answered/total && answered/total > 0.5) {
      this.grade = 4;
    }
    if(0.49 > answered/total && answered/total > 0.35) {
      this.grade = 5;
    } else {
      this.grade = 6;
    }
  }
  redirectToQuizRules() {
    this.navCtrl.setRoot(QuizRulesComponent);
  }

}
