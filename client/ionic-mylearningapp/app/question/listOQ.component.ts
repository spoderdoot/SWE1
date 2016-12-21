import { Component } from '@angular/core';
import { OpenQuestion, QuestionsService} from '../shared/index';
import { NavController } from 'ionic-angular';



@Component({
  templateUrl: 'build/question/listOQ.component.html',
  providers: [QuestionsService],
})
export class ListOQComponent {
  private openquestions: OpenQuestion[] = [];

  constructor(public questionsService: QuestionsService, public navCtrl : NavController) {
    this.navCtrl = navCtrl;
  }

  listOpenQuestions() {
    //debugger;
    this.questionsService.getOpenQuestions().subscribe(questions => {
      this.openquestions = questions;
    });
  }
  getOpenQuestion(id : number) {
    this.questionsService.getOpenQuestionWithId(id).subscribe( questions => {
      var openquestion = questions;
    }
    )
  }
}
