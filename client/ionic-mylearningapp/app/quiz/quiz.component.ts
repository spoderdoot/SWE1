import { Component } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';
import { QuizRules, GeneralQuestion, OpenQuestion, MultipleChoiceQuestion, QuestionsService} from '../shared/index';
import {ResultsComponent} from '../results/index';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { QuizRulesComponent } from '../quiz/index';

//used for the main learning quiz part
@Component({
  templateUrl: 'build/quiz/quiz.component.html',
  providers: [QuestionsService],
})
export class QuizComponent {

  // Flags which trigger if the divs in the HTML control are shown
  private quizStarted: boolean = false;
  private quizFinished: boolean = false;

  //general question is used for array which contains multiplechoicequestions and openquestions
  private generalQuestions: GeneralQuestion[] = [];
  // current question which is displayed
  private currentGeneralQuestion: GeneralQuestion;
  private currentQuestionCounter: number = 0;
  private selectedAnswer: any;
  //variables for evaluation of answers
  private correctAnswerCount: number = 0;
  // user data
  private username: any;
  private category: any;
  private numberOfQuestions: any;
  private quizRules: QuizRules;
  private isMCQ: boolean = false;
  //used for answering an open question
  private openQuestionForm: FormGroup;
  private alreadySubmitted: boolean = false;

  constructor(private alertCtrl: AlertController, public questionsService: QuestionsService, private formBuilder: FormBuilder, public navCtrl: NavController) {
    //getting some valuable information from local storage
    this.username = window.localStorage.getItem("username");
    this.category = window.localStorage.getItem("category");
    this.numberOfQuestions = window.localStorage.getItem("numberOfQuestions");
    //creating open question form for quiz later
    this.createOpenQuestionForm();
  }

  //used to initiate the quiz
  startQuiz() {
    this.getQuizQuestions();
    //setting boolean quiz started to true since the quiz will be started after receiving all questions
    this.quizStarted = true;
  }

  //used to create an open question form
  createOpenQuestionForm() {
    this.openQuestionForm = this.formBuilder.group({
      openAnswer: ['', Validators.compose([Validators.required])]
    })
  }

  //used to check if the form is valid
  isOpenQuestionFormValid(): boolean {
    let isValid: boolean = this.openQuestionForm.valid;
    if (!isValid) {
      const alert = this.alertCtrl.create({
        title: '<b>Antwort überprüfen!</b>',
        subTitle: 'Du hast keine Antwort eingegeben!',
        buttons: ['Whoops!']
      });
      alert.present();
    }
    return isValid;
  }

  /*
  //used to get an array filled with open questions and multiple choice questions depending on user input
  //returns an array filled with questions according to selected category and selected number of questions
  */
  getQuizQuestions() {
    this.quizRules = new QuizRules(this.category, this.numberOfQuestions);
    console.log(this.quizRules);
    console.log("getting " + this.numberOfQuestions + " questions " + " of category " + this.category + " from server...");
    this.questionsService.getQuizQuestions(this.quizRules).subscribe(questionsResponse => {
      console.log("quiz questions were loaded");
      console.log(questionsResponse);
      this.generalQuestions = questionsResponse;
      this.currentGeneralQuestion = this.generalQuestions[0];
      //getting 1st question type to start the quiz
      this.checkTypeOfQuestion();
      //starting question counter
      this.currentQuestionCounter = 1;
    })
  }

  //used to determine if question is a multiple-choice-question or an open quesiton
  checkTypeOfQuestion() {
    //console.log(this.generalQuestions[this.currentQuestionCounter].isMcq);
    if (this.generalQuestions[this.currentQuestionCounter].isMcq == "true") { //multiple choice question
      this.isMCQ = true;
    }
    if (this.generalQuestions[this.currentQuestionCounter].isMcq == "false") { //open question
      this.isMCQ = false;
    }
  }

  //used for unintended input issues with MCQs, since server didn't save the correct answer as previously discussed, all predefined questions work differently
  //there on clientside the handling of MCQs was changed, but to still use the createMCQ method that was implemented clientside this converter is used
  //pre-defined questions only have an ID <= 30, so every MCQ with an ID over 31 uses this converting method.
  mcqAnswerConverter() {
    if (this.currentGeneralQuestion.id <= 31) {
      if (this.selectedAnswer == 1) {
        this.selectedAnswer = this.currentGeneralQuestion.answerA;
      }
      if (this.selectedAnswer == 2) {
        this.selectedAnswer = this.currentGeneralQuestion.answerB;
      }
      if (this.selectedAnswer == 3) {
        this.selectedAnswer = this.currentGeneralQuestion.answerC;
      }
      if (this.selectedAnswer == 4) {
        this.selectedAnswer = this.currentGeneralQuestion.answerD;
      }
    }
  }

  //used to handle what happens after user answered question
  answerQuestion() {
    this.mcqAnswerConverter();
    if (this.isAnswerSelected()) {
      console.log("selected answer: " + this.selectedAnswer + " - correct answer: " + this.currentGeneralQuestion.correctAnswer);

      // check if the answer is correct
      if (this.selectedAnswer == this.currentGeneralQuestion.correctAnswer) {
        this.correctAnswerSelected();
      } else {
        this.wrongAnswerSelected();
      }
    }
  }

  //used to handle what happens after an open question is answered
  answerOpenQuestion() {
    if (this.isOpenQuestionFormValid()) {
      this.onSubmit();
      console.log("user input: " + this.openQuestionForm.value.openAnswer + " - correct answer: " + this.currentGeneralQuestion.correctAnswer);

      if (this.openQuestionForm.value.openAnswer == this.currentGeneralQuestion.correctAnswer) {
        //correctly answered
        this.correctAnswerSelected();
      } else {
        //wrongly answered
        this.wrongAnswerSelected();
      }
      //resetting answer field for open quesiton
      this.resetOpenQuestionForm();
    }
  }

  //used for submitting an open question answer
  onSubmit() {
    this.alreadySubmitted = true;
  }

  //used to reset the open question answer field
  resetOpenQuestionForm() {
    this.createOpenQuestionForm();
  }

  //checks if an answer is selected
  isAnswerSelected(): boolean {
    let isAnswerEmpty: boolean = this.selectedAnswer == null || this.selectedAnswer == '';

    // check if user selected an answer
    if (isAnswerEmpty) {
      const alert = this.alertCtrl.create({
        title: '<b>Angaben überprüfen!</b>',
        subTitle: 'Wähle eine Antwort!',
        buttons: ['OK']
      });
      alert.present();
    }

    return !isAnswerEmpty;
  }

  //used to show the user that he answered correctly
  correctAnswerSelected() {
    this.correctAnswerCount++;
    console.log("correctly answered questions: " + this.correctAnswerCount);
    const alert = this.alertCtrl.create({
      title: '<b>Richtig!</b>',
      subTitle: 'Die Antwort war richtig!',
      buttons: [
        {
          text: 'Weiter',
          // when the user clicks 'weiter', trigger this method
          handler: () => {
            this.nextGeneralQuestion();
          }
        }
      ]
    });
    alert.present();
  }

  //used to get the next question for the quiz
  nextGeneralQuestion() {
    this.alreadySubmitted = false;
    console.log(this.generalQuestions.length);

    if (this.currentQuestionCounter + 1 > this.generalQuestions.length) { //last question was finished
      this.quizStarted = false;
      this.selectedAnswer = '';
      this.redirectToResults();

    } else {
      //next question
      this.selectedAnswer = '';
      this.currentGeneralQuestion = this.generalQuestions[this.currentQuestionCounter];
      //checking if question is an open question or a multiple choice question
      this.checkTypeOfQuestion();
      this.currentQuestionCounter++;
      console.log(this.currentGeneralQuestion);
    }
  }

  //used to show user he answered the question wrongly
  wrongAnswerSelected() {
    this.selectedAnswer = '';

    const alert = this.alertCtrl.create({
      title: '<b>Falsch!</b>',
      subTitle: 'Deine Antwort war leider falsch.',
      buttons: [{
        text: 'Weiter',
        // when the user clicks 'weiter', trigger this method
        handler: () => {
          this.nextGeneralQuestion();
        }
      }]
    });
    alert.present();
  }

  //saving quiz results to local storage
  saveQuizResults() {
    var correctAnswerCountString = "" + this.correctAnswerCount;
    window.localStorage.setItem("correctAnswerCount", correctAnswerCountString);
    console.log(window.localStorage.getItem("correct answers as string" + "correctAnswerCount"));
    window.localStorage.setItem("username", this.username);
    console.log(window.localStorage.getItem("username"));
    window.localStorage.setItem("totalNumberOfQuestions", this.numberOfQuestions);
    console.log(window.localStorage.getItem("totalNumberOfQuestions"));
  }

  //used for redirecting to QuizRulesComponent again if user wishes to change quiz rules
  changeRules() {
    this.navCtrl.setRoot(QuizRulesComponent);
  }

  //shows user the results of the game
  redirectToResults() {
    this.saveQuizResults();
    this.navCtrl.setRoot(ResultsComponent);
  }
}
