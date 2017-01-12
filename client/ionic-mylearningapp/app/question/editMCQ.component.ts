import { Component } from '@angular/core';
import { MultipleChoiceQuestion, QuestionsService} from '../shared/index';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AlertController, NavController } from 'ionic-angular';
import { EditQuestionComponent } from './index';

//used for showing the user all multiple choice questions(MCQ)
@Component({
  templateUrl: 'build/question/editMCQ.component.html',
  providers: [QuestionsService],
})
export class EditMCQComponent {
  private multipleChoiceQuestions: MultipleChoiceQuestion[] = [];
  private multipleChoiceQuestion: MultipleChoiceQuestion;
  private isForEdit: boolean;
  private editMCQForm: FormGroup;

  constructor(private alertCtrl: AlertController, public questionsService: QuestionsService,  public navCtrl: NavController, private formBuilder: FormBuilder) {
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
      category: [this.multipleChoiceQuestion.category, Validators.compose([Validators.required])],
      question: [this.multipleChoiceQuestion.question, Validators.compose([Validators.required])],
      answerA: [this.multipleChoiceQuestion.answerA, Validators.compose([Validators.required])],
      answerB: [this.multipleChoiceQuestion.answerB, Validators.compose([Validators.required])],
      answerC: [this.multipleChoiceQuestion.answerC, Validators.compose([Validators.required])],
      answerD: [this.multipleChoiceQuestion.answerD, Validators.compose([Validators.required])],
      correctAnswer: [this.multipleChoiceQuestion.correctAnswer, Validators.compose([Validators.required])]
    })
  }

  //checks if form is valid
  isFormValid(): boolean {
    let isValid: boolean = this.editMCQForm.valid;
    let noWhiteSpace: boolean = this.checkUserInputForWhiteSpace();
    console.log(noWhiteSpace);
    if (!isValid) {
      const alert = this.alertCtrl.create({
        title: '<b> Bitte füllen Sie alle Felder aus!</b>',
        subTitle: 'Um die Frage speichern zu können, müssen sämtliche Felder ausgefüllt sein.',
        buttons: ['OK']
      });
      //presents user the alert message
      alert.present();
    } else
    if (!noWhiteSpace) {
      const alert = this.alertCtrl.create({
        title: '<b>Angaben überprüfen!</b>',
        subTitle: 'Leerzeichen zählen leider nicht! Bitte geben Sie einen entsprechenden Text ein!',
        buttons: ['OK']
      });
      alert.present();
    }
    if (isValid && noWhiteSpace) {
      return isValid;
    }
  }

  //used for checking if user only input white spaces
  checkForWhiteSpace(input: string): boolean {
    var result = /\S/.test(input);
    console.log(result);
    return result;
  }

  //checks if user input only white spaces
  checkUserInputForWhiteSpace(): boolean {
    if (this.checkForWhiteSpace(this.editMCQForm.value.question) == true && this.checkForWhiteSpace(this.editMCQForm.value.answerA) == true && this.checkForWhiteSpace(this.editMCQForm.value.answerB) == true && this.checkForWhiteSpace(this.editMCQForm.value.answerC) == true && this.checkForWhiteSpace(this.editMCQForm.value.answerD) == true) {
      return true;
    }
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

  //used for getting a specific question by its ID
  getQuestionById(id : number) {
    for(var i  = 0; i < this.multipleChoiceQuestions.length; i++) {
      if(id == this.multipleChoiceQuestions[i].id)
      this.multipleChoiceQuestion = this.multipleChoiceQuestions[i];
    }
  }

  //used for editting question and setting html code to the editted one
  editQuestion(id : number) {
    this.getQuestionById(id);
    this.createForm();
    this.isForEdit = true;
  }

  //used for saving the edit
  saveEdit() {
    //checking if form is valid
    if (this.isFormValid()) {
      //creating new MCQ that server can use to update existing MCQ by comparing IDs
      var editMCQ = new MultipleChoiceQuestion(this.multipleChoiceQuestion.id, this.editMCQForm.value.category, this.editMCQForm.value.question, this.editMCQForm.value.answerA, this.editMCQForm.value.answerB, this.editMCQForm.value.answerC, this.editMCQForm.value.answerD, this.editMCQForm.value.correctAnswer);
      this.questionsService.editMultipleChoiceQuestion(editMCQ).subscribe(response => {
        this.showSuccessMessageAndResetForm(response);
      })
    }
  }

  //used for cancelling editting the question, no changes will be saved
  cancel() {
    this.isForEdit = false;
    this.navCtrl.setRoot(EditQuestionComponent);
  }

}
