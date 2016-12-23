import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Question, QuestionsService} from '../shared/index';
import { NavController } from 'ionic-angular';
import { CreateMCQComponent, CreateOQComponent} from './index';

@Component({
  templateUrl: 'build/question/createQuestion.component.html',
  providers: [QuestionsService],
})
export class CreateQuestionComponent {
  private createQuestionForm: FormGroup;

  constructor(private alertCtrl: AlertController, public navCtrl : NavController, private formBuilder: FormBuilder, public questionsService: QuestionsService) {
    // init the form
    this.createForm();
  }

  createForm() {
    // create the form group and define the validators
    this.createQuestionForm = this.formBuilder.group({

      question: ['', Validators.compose([Validators.required])],
      answerA: ['', Validators.compose([Validators.required])],
      answerB: ['', Validators.compose([Validators.required])],
      answerC: ['', Validators.compose([Validators.required])],
      answerD: ['', Validators.compose([Validators.required])],
      correctAnswer: ['1', Validators.compose([Validators.required])]
    });
  }

  createQuestion() {
    if (this.isFormIsValid()) {

      // create new question object with the form data
      var newQuestion = new Question(-1, this.createQuestionForm.value.question, this.createQuestionForm.value.answerA, this.createQuestionForm.value.answerB,
        this.createQuestionForm.value.answerC, this.createQuestionForm.value.answerD, this.createQuestionForm.value.correctAnswer);

      // call service to create the question and wait for an answer
      this.questionsService.createQuestion(newQuestion).subscribe(response => {
        this.showSuccesMessageAndResetForm(response);
      });;
    }
  }


  isFormIsValid(): boolean {
    // check if form input is valid (are all defined validators ok?)
    let isValid: boolean = this.createQuestionForm.valid;

    if (!isValid) {
      // create a pop-up message
      const alert = this.alertCtrl.create({
        title: '<b>Angaben überprüfen!</b>',
        subTitle: 'Um die Frage zu speichern müssen alle Felder gefüllt sein!',
        buttons: ['OK']
      });
      // show the pop-up message
      alert.present();
    }
    return isValid;
  }

  showSuccesMessageAndResetForm(response: any) {
    console.log("success - question was successfully stored with id " + response);

    // create a pop-up message
    const alert = this.alertCtrl.create({
      title: '<b>Frage gespeichert!</b>',
      subTitle: 'Ihre Frage wurde unter der Id ' + response + ' gespeichert.',
      buttons: ['OK']
    });
    // show the pop-up message
    alert.present();

    // reset the form
    this.createForm();
  }

  redirectToCreateMCQ() {
    this.navCtrl.push(CreateMCQComponent);
  }
  redirectToCreateOQ() {
    this.navCtrl.push(CreateOQComponent);
  }
}
