import { Component } from '@angular/core';
import { Question, MultipleChoiceQuestion, QuestionsService} from '../shared/index';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AlertController } from 'ionic-angular';

//used for showing the user all multiple choice questions(MCQ)
@Component({
  templateUrl: 'build/question/editMCQ.component.html',
  providers: [QuestionsService],
})
export class EditMCQComponent {
  private multipleChoiceQuestions: MultipleChoiceQuestion[] = [];
  private multipleChoiceQuestion : MultipleChoiceQuestion;
  private isForEdit : boolean;
  private editMCQForm : FormGroup;

  constructor(private alertCtrl : AlertController, public questionsService: QuestionsService, private formBuilder : FormBuilder) {
    this.isForEdit = false;
  }

  //lists all MCQs
  listMultipleChoiceQuestions() {
    //debugger;
    this.questionsService.getMultipleChoiceQuestions().subscribe(questions => {
      this.multipleChoiceQuestions = questions;
    });
  }

  createForm() {

    this.editMCQForm = this.formBuilder.group({
      category : ['', Validators.compose([Validators.required])],
      question: ['', Validators.compose([Validators.required])],
      answerA: ['', Validators.compose([Validators.required])],
      answerB: ['', Validators.compose([Validators.required])],
      answerC: ['', Validators.compose([Validators.required])],
      answerD: ['', Validators.compose([Validators.required])],
      correctAnswer : ['', Validators.compose([Validators.required])]
    })
  }

  //checks if form is valid
  isFormValid() : boolean {
    let isValid: boolean = this.editMCQForm.valid;

    if(!isValid) {
      const alert = this.alertCtrl.create( {
        title: '<b> Bitte füllen Sie alle Felder aus!</b>',
        subTitle: 'Um die Frage speichern zu können, müssen sämtliche Felder ausgefüllt sein.',
        buttons: ['OK']
      });
      //presents user the alert message
      alert.present();
    }
    return isValid;
  }

  //shows success message to user if the MCQ was successfully saved
  showSuccessMessageAndResetForm(response: any) {
    console.log("successfully editted question, stored with id " + response);

    const alert = this.alertCtrl.create({
      title: '<b>Frage erfolgreich geändert!</b>',
      buttons: ['OK']
    })

    alert.present();
    //resets form, so user can continue creating questions
    this.createForm();
    //resets to beginning of edit questions
    this.isForEdit = false;
  }

  editQuestion() {
    //console.log(temp);
    this.createForm();
    var position : number = 0;
    this.multipleChoiceQuestion = this.multipleChoiceQuestions[position];
    this.editMCQForm.value.category = this.multipleChoiceQuestion.category;
    this.editMCQForm.value.question = this.multipleChoiceQuestion.question;
    this.editMCQForm.value.answerA = this.multipleChoiceQuestion.answerA;
    this.editMCQForm.value.answerB = this.multipleChoiceQuestion.answerB;
    this.editMCQForm.value.answerC = this.multipleChoiceQuestion.answerC;
    this.editMCQForm.value.answerD = this.multipleChoiceQuestion.answerD;
    this.editMCQForm.value.correctAnswer = this.multipleChoiceQuestion.correctAnswer;
    this.isForEdit = true;
  }

}
