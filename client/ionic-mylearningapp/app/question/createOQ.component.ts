//OQ = Open Question
import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { QuestionsService, OpenQuestion} from '../shared/index';
import { NavController } from 'ionic-angular';

//used to create open questions - short OQ
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

  //creates the form for an open question
  createForm() {

    // create the form group and define the validators
    this.createOpenQuestionForm = this.formBuilder.group({

      //each correct question consists of a category, a question and a correct answer
      category: ['1', Validators.compose([Validators.required])],
      question: ['', Validators.compose([Validators.required])],
      correctAnswer: ['', Validators.compose([Validators.required])]
    });
  }

  //used to create an open question - user input is send to the server who should deliver the response if it was possible to save the question or not
  createOpenQuestion() {

    //checks if form is valid
    if (this.isFormIsValid()) {

      // create new open question object with the form data
      var newOpenQuestion = new OpenQuestion(-1, this.createOpenQuestionForm.value.category, this.createOpenQuestionForm.value.question, this.createOpenQuestionForm.value.correctAnswer);

      // call service to create the question and wait for an answer
      this.questionsService.createOpenQuestion(newOpenQuestion).subscribe(response => {
        this.showSuccesMessageAndResetForm(response);
      });;
    }
  }

  //checks if form is valid
  isFormIsValid(): boolean {
    // check if form input is valid (are all defined validators ok?)
    let isValid: boolean = this.createOpenQuestionForm.valid;
    let noWhiteSpace : boolean = this.checkUserInputForWhiteSpace();
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
    if(!noWhiteSpace) {
      const alert = this.alertCtrl.create({
        title: '<b>Angaben überprüfen!</b>',
        subTitle: 'Leerzeichen zählen leider nicht! Bitte geben Sie einen entsprechenden Text ein!',
        buttons: ['OK']
      });
      alert.present();
    }
    if(isValid && noWhiteSpace) {
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
  checkForWhiteSpace(input : string) : boolean {
    var result = /\S/.test(input);
    console.log(result);
    return result;
  }

  //checks if user input only white spaces
  checkUserInputForWhiteSpace() : boolean {
    if(this.checkForWhiteSpace(this.createOpenQuestionForm.value.question) == true && this.checkForWhiteSpace(this.createOpenQuestionForm.value.correctAnswer) == true) {
      return true;
    }
  }
 }
