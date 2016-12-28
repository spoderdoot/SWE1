import { Component } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';
import { GeneralQuestion, OpenQuestion, MultipleChoiceQuestion, Question, QuestionsService} from '../shared/index';
import {ResultsComponent} from '../results/index';

@Component({
  templateUrl: 'build/quiz/quiz.component.html',
  providers: [QuestionsService],
})
export class QuizComponent {

  // Flags which trigger if the divs in the HTML control are shown
  private quizStarted: boolean = false;
  private quizFinished: boolean = false;

  // array which contains all questions from the service
  private questions: Question[] = [];
  //general question is used for array which contains multiplechoicequestions and openquestions
  private generalQuestions : GeneralQuestion[] = [];
  // current question which is displayed
  private currentQuestion: Question;
  private currentGeneralQuestion : GeneralQuestion;
  private currentQuestionCounter: number;
  private selectedAnswer: any;

  //variables for evaluation of answers
  private correctAnswerCount : number = 0;
  // user data
  private username: any;
  private category : any;
  private numberOfQuestions : any;
  private isMCQ : boolean = false;

  constructor(private alertCtrl: AlertController, public questionsService: QuestionsService, public navCtrl : NavController) {
    this.username = window.localStorage.getItem("username");

    this.category = window.localStorage.getItem("category");
  //  this.setCategoryName();
    console.log(this.category); //1 for math, 2 for english
    this.numberOfQuestions = window.localStorage.getItem("numberOfQuestions");
  //  this.clearifyNumberOfQuestions();
    console.log(this.numberOfQuestions);
  }

  startQuiz() {
    this.getQuestions();
  }

  /*
  //used to get an array filled with open questions and multiple choice questions depending on user input
  //returns an array filled with questions according to selected category and selected number of questions
  */
  getQuizQuestions() {
    this.questionsService.getQuizQuestions(this.category, this.numberOfQuestions).subscribe(questionsResponse => {
      console.log("quiz questions were loaded");
      this.generalQuestions = questionsResponse;
      this.currentGeneralQuestion = this.generalQuestions[0];
      //getting 1st question type to start the quiz
      this.checkTypeOfQuestion();
      this.currentQuestionCounter = 1;
      this.quizStarted = true;
    })
  }

  //used to determine if question is a multiple-choice-question or an open quesiton
  checkTypeOfQuestion () {
    if(this.generalQuestions[this.currentQuestionCounter].isMCQ == 'true') { //idea is to set HTML depending on isMCQ
      this.isMCQ = true;
    }
    if(this.generalQuestions[this.currentQuestionCounter].isMCQ == 'false') {
      this.isMCQ = false;
    }
  }

  getQuestions() {
    // call servie
    this.questionsService.getQuestions().subscribe(questions => {
      console.log("Questions were loaded");
      this.questions = questions;
      // set current question to the first element of the array
      this.currentQuestion = this.questions[0];
      // set the question counter to the inital number 1
      this.currentQuestionCounter = 1;
      // quiz is started
      this.quizStarted = true;
    });
  }

  answerQuestion() {
    if (this.isAnswerSelected()) {
      console.log("selected answer: " + this.selectedAnswer + " - correct answer: " + this.currentQuestion.correctAnswer);

      // check if the answer is correct
      if (this.selectedAnswer == this.currentQuestion.correctAnswer) {
        this.correctAnswerSelected();
        //this.correctAnswerCount++;
      } else {
        this.wrongAnswerSelected();
      }
    }
  }

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

  correctAnswerSelected() {
    this.correctAnswerCount = this.correctAnswerCount+1;
    console.log("correctly answered questions: " + this.correctAnswerCount);
    const alert = this.alertCtrl.create({
      title: '<b>Richtig!</b>',
      subTitle: 'Die Antwort ' + this.selectedAnswer + ' war richtig!',
      buttons: [
        {
          text: 'Weiter',
          // when the user clicks ok, trigger this method
          handler: () => {
            this.nextQuestion();
          }
        }
      ]
    });
    alert.present();
  }

  nextGeneralQuestion() {
      //last question
      if(this.currentQuestionCounter == this.generalQuestions.length) {
        this.quizStarted = false;
        this.selectedAnswer = '';
        this.redirectToResults();
      }

      //next question
      this.currentQuestionCounter++;
      this.selectedAnswer = '';
      this.currentGeneralQuestion = this.generalQuestions[this.currentQuestionCounter -1];
      this.checkTypeOfQuestion();
  }
  nextQuestion() {
    //this.increaseBalance();

    // is last question reached
    if (this.currentQuestionCounter == this.questions.length) {
     this.quizStarted = false;
     this.selectedAnswer = '';
     this.redirectToResults();
    }

    // next question
    this.currentQuestionCounter++;
    this.selectedAnswer = '';
    this.currentQuestion = this.questions[this.currentQuestionCounter - 1];

  }


  wrongAnswerSelected() {
    //this.quizStarted = false;
    this.selectedAnswer = '';

    const alert = this.alertCtrl.create({
      title: '<b>Falsch!</b>',
      subTitle: 'Deine Antwort war leider falsch.',
      buttons: [    {
            text: 'Weiter',
            // when the user clicks ok, trigger this method
            handler: () => {
              this.nextQuestion();
            }
          }]
    });
    alert.present();
  }
  saveQuizResults(){
    var correctAnswerCountString = ""+this.correctAnswerCount;
    window.localStorage.setItem("correctAnswerCount",  correctAnswerCountString);
    console.log(window.localStorage.getItem("correct answers as string" + "correctAnswerCount"));
    window.localStorage.setItem("username", this.username);
    console.log(window.localStorage.getItem("username"));
    window.localStorage.setItem("totalNumberOfQuestions",  this.numberOfQuestions);
    console.log(window.localStorage.getItem("totalNumberOfQuestions"));
  }




//shows user the results of the game
  redirectToResults() {
    this.saveQuizResults();
    this.navCtrl.setRoot(ResultsComponent);
}
}
