//MCQ Multiple Choice Question
import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MultipleChoiceQuestion, QuestionsService} from '../shared/index';


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
    category : ['1', Validators.compose([Validators.required])],
    question: ['', Validators.compose([Validators.required])],
    answerA: ['', Validators.compose([Validators.required])],
    answerB: ['', Validators.compose([Validators.required])],
    answerC: ['', Validators.compose([Validators.required])],
    answerD: ['', Validators.compose([Validators.required])],
    correctAnswer : ['1', Validators.compose([Validators.required])]
  })
}

createMCQ() {
  if (this.isFormValid()) {
//ID, subject, question, correctAnswer
    var newMCQ = new MultipleChoiceQuestion(-1, this.createMCQForm.value.category, this.createMCQForm.value.question, this.createMCQForm.value.answerA, this.createMCQForm.value.answerB, this.createMCQForm.value.answerC, this.createMCQForm.value.answerD, this.createMCQForm.value.correctAnswer);
    this.questionsService.createMultipleChoiceQuestion(newMCQ).subscribe(response => {
      this.showSuccessMessageAndResetForm(response);
  })
  }
}


isFormValid() : boolean {
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
