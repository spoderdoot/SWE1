//OQ = Open Question
import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Question, QuestionsService, OpenQuestion} from '../shared/index';
import { NavController } from 'ionic-angular';

@Component({
  templateUrl: 'build/question/createOQ.component.html',
  providers: [QuestionsService],
})
export class CreateOQComponent {
  private createOpenQuestionForm: FormGroup;

  constructor(private alertCtrl: AlertController, public navCtrl : NavController, private formBuilder: FormBuilder, public questionsService: QuestionsService) {
    // init the form
    this.createForm();
  }

  createForm() {
    // create the form group and define the validators
    this.createOpenQuestionForm = this.formBuilder.group({

      category: ['1', Validators.compose([Validators.required])],
      question: ['', Validators.compose([Validators.required])],
      correctAnswer: ['', Validators.compose([Validators.required])]
    });
  }

  createOpenQuestion() {
    if (this.isFormIsValid()) {

      // create new question object with the form data
      var newOpenQuestion = new OpenQuestion(-1, this.createOpenQuestionForm.value.category, this.createOpenQuestionForm.value.question, this.createOpenQuestionForm.value.correctAnswer);

      // call service to create the question and wait for an answer
      this.questionsService.createOpenQuestion(newOpenQuestion).subscribe(response => {
        this.showSuccesMessageAndResetForm(response);
      });;
    }
  }

  /*
  createOpenQuestion() {
    if(this.isOpenFormIsValid())  {
      var newOpenQuestion= new OpenQuestion(this.createOpenQuestionForm.value.question, this.createOpenQuestionForm.value.correctAnswer);

      this.questionsService.createOpenQuestion(newOpenQuestion).subscribe(response => {
        this.showSuccessMessageAndResetOpenForm(response);
      });;
    }
  } */

  isFormIsValid(): boolean {
    // check if form input is valid (are all defined validators ok?)
    let isValid: boolean = this.createOpenQuestionForm.valid;

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
 }
