
import { Component } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';
import { OpenQuestion, MultipleChoiceQuestion, QuestionsService} from '../shared/index';
import {ResultsComponent} from '../results/index';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { QuizComponent } from '../quiz/index';

//used to set the rules for the quiz by the user
@Component({
  templateUrl: 'build/quiz/quizrules.component.html',
  providers: [QuestionsService],
})
export class QuizRulesComponent {
  private username: string;
  private category: string;
  private quizRulesForm: FormGroup;
  
  constructor(private alertCtrl: AlertController, public questionsService: QuestionsService, private formBuilder: FormBuilder, public navCtrl: NavController) {
    this.username = window.localStorage.getItem("username");
    //initializing form
    this.createForm();
  }

  //creates form with category and number of questions
  createForm() {
    this.quizRulesForm = this.formBuilder.group({

      category: ['Mathe', Validators.compose([Validators.required])],
      numberOfQuestions: ['10', Validators.compose([Validators.required])]

    })
  }

  //checks if form is valid
  isFormValid(): boolean {

    let isValid: boolean = this.quizRulesForm.valid;
    console.log(this.quizRulesForm.value.category);
    console.log(this.quizRulesForm.value.numberOfQuestions);
    console.log(this.quizRulesForm.valid);
    if (!isValid) {
      const alert = this.alertCtrl.create({
        title: '<b>Spielregeln festlegen!</b>',
        subTitle: 'Um das Spiel zu starten, musst du deine Kategorie und die Anzahl der Fragen wählen!',
        buttons: ['Verstanden!']
      });
      alert.present();
    } else {
      //saving quiz rules to use them later in the quiz.component
      this.saveQuizRules(this.quizRulesForm.value.category, this.quizRulesForm.value.numberOfQuestions);
    }

    return isValid;
  }

  //used for saving quiz rules into local storage for later use
  saveQuizRules(category: string, numberOfQuestions: number) {
    window.localStorage.setItem("category", category);
    console.log(window.localStorage.getItem("category"));
    window.localStorage.setItem("numberOfQuestions", numberOfQuestions.toString());
    console.log(window.localStorage.getItem("numberOfQuestions"));
  }

  //redirects to quiz component to start the quiz depending on set rules
  redirectToQuiz() {
    //checks if form is valid
    if (this.isFormValid()) {
      this.navCtrl.setRoot(QuizComponent);
    }
  }

}
