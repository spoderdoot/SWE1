import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { Question, QuestionsService} from '../shared/index';

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
  // current question which is displayed
  private currentQuestion: Question;
  private currentQuestionCounter: number;
  private selectedAnswer: any;

  // user data
  private username: any;
  private balance: any = 0;

  constructor(private alertCtrl: AlertController, public questionsService: QuestionsService) {
  }

  startQuiz() {
    // user must have set his name
    if (this.username == null) {
      const alert = this.alertCtrl.create({
        title: '<b>Angaben überprüfen!</b>',
        subTitle: 'Um das Spiel zu starten musst du deinen Namen angeben!',
        buttons: ['OK']
      });
      alert.present();
      return;
    }
    // call service to get questions
    this.getQuestions();
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
    const alert = this.alertCtrl.create({
      title: '<b>Richtig!</b>',
      subTitle: 'Die Antwort ' + this.selectedAnswer + ' war richtig!',
      buttons: [
        {
          text: 'OK',
          // when the user clicks ok, trigger this method
          handler: () => {
            this.nextQuestion();
          }
        }
      ]
    });
    alert.present();
  }

  nextQuestion() {
    this.increaseBalance();

    // is last question reached
    if (this.currentQuestionCounter == this.questions.length) {
      this.quizStarted = false;
      this.selectedAnswer = '';
      return;
    }

    // next question
    this.currentQuestionCounter++;
    this.selectedAnswer = '';
    this.currentQuestion = this.questions[this.currentQuestionCounter - 1];
  }

  increaseBalance() {
    if (this.balance == 0) {
      this.balance = 50;
    } else {
      this.balance += this.balance;
    }
  }

  wrongAnswerSelected() {
    this.quizStarted = false;
    this.selectedAnswer = '';

    const alert = this.alertCtrl.create({
      title: '<b>Falsch!</b>',
      subTitle: 'Leider verloren.',
      buttons: [    {
            text: 'OK',
            // when the user clicks ok, trigger this method
            handler: () => {
              this.nextQuestion();
            }
          }]
    });


    alert.present();
  }
}
