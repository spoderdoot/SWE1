//MCQ Multiple Choice Question
import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MultipleChoiceQuestion, QuestionsService} from '../shared/index';

//used to create multiple choice questions - short MCQ
@Component({
  templateUrl: 'build/question/createMCQ.component.html',
  providers: [QuestionsService],
})
export class CreateMCQComponent {
  private createMCQForm : FormGroup;

  constructor(private alertCtrl : AlertController, private formBuilder : FormBuilder, public questionsService : QuestionsService){
    //Creates the form for a multiple choice question
    this.createForm();
  }

//creates the form of a multple choice question
//each MCQ has a category, a question, four possible answers and a correct answer
createForm() {

  this.createMCQForm = this.formBuilder.group({
    category : ['1', Validators.compose([Validators.required])],
    question: ['', Validators.compose([Validators.required])],
    answerA: ['', Validators.compose([Validators.required])],
    answerB: ['', Validators.compose([Validators.required])],
    answerC: ['', Validators.compose([Validators.required])],
    answerD: ['', Validators.compose([Validators.required])],
    correctAnswer : ['1', Validators.compose([Validators.required])]
  })
}

//sends user input to server if form is valid and creates a new MCQ
createMCQ() {
  if (this.isFormValid()) {

    var newMCQ = new MultipleChoiceQuestion(-1, this.createMCQForm.value.category, this.createMCQForm.value.question, this.createMCQForm.value.answerA, this.createMCQForm.value.answerB, this.createMCQForm.value.answerC, this.createMCQForm.value.answerD, this.createMCQForm.value.correctAnswer);
    this.questionsService.createMultipleChoiceQuestion(newMCQ).subscribe(response => {
      this.showSuccessMessageAndResetForm(response);
  })
  }
}

//checks if form is valid
isFormValid() : boolean {
  let isValid: boolean = this.createMCQForm.valid;

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
  console.log("successfully created question, stored with id " + response);

  const alert = this.alertCtrl.create({
    title: '<b>Frage gespeichert</b>',
    subTitle: 'Ihre Frage wurde unter der ID ' + response + ' gespeichert.',
    buttons: ['OK']
  })

  alert.present();
  //resets form, so user can continue creating questions
  this.createForm();
}
}
