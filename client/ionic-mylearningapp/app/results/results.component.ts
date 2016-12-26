import {Component} from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';
import { OpenQuestion, MultipleChoiceQuestion, Question, QuestionsService} from '../shared/index';

@Component({
  templateUrl: 'build/results/results.component.html'
})
export class ResultsComponent {
  private username : string;
  private correctAnswerCount : string;
  private totalNumberOfQuestions : string;
  constructor(private alertCtrl: AlertController, public questionsService: QuestionsService, public navCtrl : NavController) {
      this.username = window.localStorage.getItem("username");
      this.correctAnswerCount = window.localStorage.getItem("correctAnswerCount");
      this.totalNumberOfQuestions = window.localStorage.getItem("totalNumberOfQuestions");
  }
  printResults() {

  }
}
