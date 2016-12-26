
import { Component } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';
import { OpenQuestion, MultipleChoiceQuestion, Question, QuestionsService} from '../shared/index';
import {ResultsComponent} from '../results/index';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { QuizComponent } from '../quiz/index';

@Component({
  templateUrl: 'build/quiz/quizrules.component.html',
  providers: [QuestionsService],
})
export class QuizRulesComponent {
private username : string;
private questions: Question[] = [];
private category : string;
private quizRulesForm : FormGroup;
  constructor(private alertCtrl: AlertController, public questionsService: QuestionsService, private formBuilder : FormBuilder, public navCtrl : NavController) {
    this.username = window.localStorage.getItem("username");
    this.createForm();
  }

  createForm() {
    this.quizRulesForm = this.formBuilder.group({

      category : ['Mathe', Validators.compose([Validators.required])],
      numberOfQuestions : ['10', Validators.compose([Validators.required])]
      //isTeacher : ['1', Validators.compose([Validators.required])]
    })
  }

  isFormValid() : boolean {

    let isValid: boolean = this.quizRulesForm.valid;
    console.log(this.quizRulesForm.value.category);
    console.log(this.quizRulesForm.value.numberOfQuestions);
    console.log(this.quizRulesForm.valid);
    if(!isValid) {
       const alert = this.alertCtrl.create({
        title: '<b>Spielregeln festlegen!</b>',
        subTitle: 'Um das Spiel zu starten, musst du deine Kategorie und die Anzahl der Fragen wählen!',
        buttons: ['Verstanden!']
      });
      alert.present();
    } else {
      this.saveQuizRules(this.quizRulesForm.value.category, this.quizRulesForm.value.numberOfQuestions);
    }

    return isValid;
  }

  saveQuizRules(category : string, numberOfQuestions : number) {
    window.localStorage.setItem("category",  category);
    console.log(window.localStorage.getItem("category"));
    window.localStorage.setItem("numberOfQuestions", numberOfQuestions.toString());
    console.log(window.localStorage.getItem("numberOfQuestions"));
  }

  redirectToQuiz() {
    if(this.isFormValid()) {
      this.navCtrl.setRoot(QuizComponent);
    }
  }

}
