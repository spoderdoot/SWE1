
import { Component } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';
import { OpenQuestion, MultipleChoiceQuestion, Question, QuestionsService} from '../shared/index';
import {ResultsComponent} from '../results/index';

@Component({
  templateUrl: 'build/quiz/quiz.component.html',
  providers: [QuestionsService],
})
export class QuizRulesComponent {
private username : string;
private questions: Question[] = [];
private category : string;
  constructor(private alertCtrl: AlertController, public questionsService: QuestionsService, public navCtrl : NavController) {
    this.username = window.localStorage.getItem("username");
  }
}
