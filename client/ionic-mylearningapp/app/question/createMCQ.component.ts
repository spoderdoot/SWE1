//MCQ Multiple Choice Question
import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Question, QuestionsService} from '../shared/index';


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

createForm() {

  this.createMCQForm = this.formBuilder.group({
    subject : [, Validators.compose([Validators.required])],
    question: ['', Validators.compose([Validators.required])],
    correctAnswer : ['', Validators.compose([Validators.required])]
  })
}
/*
createMCQ() {
  if (this.isFormValid()) {
//ID, subject, question, correctAnswer
    var newMCQ = new MCQ(ID, this.createMCQForm.value.subject, this.createMCQForm.value.question, this.createMCQForm.value.correctAnswer);
    this.questionsService.createQuestion(newMCQ).subscribe(response => {
      this.showSuccessMessageAndResetForm(response);
  })
  }
}
*/

isFormIsValid() : boolean {
  let isValid: boolean = this.createMCQForm.valid;

  if(!isValid) {
    const alert = this.alertCtrl.create( {
      title: '<b> Bitte füllen Sie alle Felder aus!</b>',
      subTitle: 'Um die Frage speichern zu können, müssen sämtliche Felder ausgefüllt sein.',
      buttons: ['OK']
    });

    alert.present();
  }
  return isValid;
}

showSuccessMessageAndResetForm(response: any) {
  console.log("successfully created question, stored with id " + response);

  const alert = this.alertCtrl.create({
    title: '<b>Frage gespeichert</b>',
    subTitle: 'Ihre Frage wurde unter der ID ' + response + ' gespeichert.',
    buttons: ['OK']
  })

  alert.present();
  this.createForm();
}
}
