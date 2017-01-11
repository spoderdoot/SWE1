import { Component } from '@angular/core';
import { OpenQuestion, QuestionsService} from '../../shared/index';
import { NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AlertController } from 'ionic-angular';


//used to show the user all open questions
@Component({
  templateUrl: 'build/question/editOQ.component.html',
  providers: [QuestionsService],
})
export class EditOQComponent {
  private openquestions: OpenQuestion[] = [];
  private openQuestion: OpenQuestion;
  private isForEdit: boolean;
  private editOQForm: FormGroup;

  constructor(private alertCtrl: AlertController, public questionsService: QuestionsService, public navCtrl: NavController, private formBuilder: FormBuilder) {
    this.navCtrl = navCtrl;
    this.isForEdit = false;
  }

  //lists all open questions
  listOpenQuestions() {
    //debugger;
    this.questionsService.getOpenQuestions().subscribe(questions => {
      this.openquestions = questions;
    });
  }

  //NOT USED YET, but might be useful later - get a specific question depending on question ID
  getOpenQuestion(id: number) {
    this.questionsService.getOpenQuestionWithId(id).subscribe(questions => {
      var openquestion = questions;
    }
    )
  }

  //creates the form for an open question
  createForm() {

    // create the form group and define the validators
    this.editOQForm = this.formBuilder.group({

      //each correct question consists of a category, a question and a correct answer
      category: ['1', Validators.compose([Validators.required])],
      question: ['', Validators.compose([Validators.required])],
      correctAnswer: ['', Validators.compose([Validators.required])]
    });
  }

  //checks if form is valid
  isFormIsValid(): boolean {
    // check if form input is valid (are all defined validators ok?)
    let isValid: boolean = this.editOQForm.valid;
    let noWhiteSpace: boolean = this.checkUserInputForWhiteSpace();
    console.log(noWhiteSpace);
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

  //shows success message to user if he could successfully create an open question
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

    // reset the form so more question can be created
    this.createForm();
  }

  //used for checking if user only input white spaces
  checkForWhiteSpace(input: string): boolean {
    var result = /\S/.test(input);
    console.log(result);
    return result;
  }

  //checks if user input only white spaces
  checkUserInputForWhiteSpace(): boolean {
    if (this.checkForWhiteSpace(this.editOQForm.value.question) == true && this.checkForWhiteSpace(this.editOQForm.value.correctAnswer) == true) {
      return true;
    }
  }

  editQuestion() {
    this.createForm();
    var position: number = 0;
    this.openQuestion = this.openquestions[position];
    this.editOQForm.value.category = this.openQuestion.category;
    this.editOQForm.value.question = this.openQuestion.question;
    this.editOQForm.value.correctAnswer = this.openQuestion.correctAnswer;
    this.isForEdit = true;
  }
}
