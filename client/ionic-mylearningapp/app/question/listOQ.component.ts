import { Component } from '@angular/core';
import { OpenQuestion, QuestionsService} from '../shared/index';
import { NavController } from 'ionic-angular';


//used to show the user all open questions
@Component({
  templateUrl: 'build/question/listOQ.component.html',
  providers: [QuestionsService],
})
export class ListOQComponent {
  private openquestions: OpenQuestion[] = [];

  constructor(public questionsService: QuestionsService, public navCtrl : NavController) {
    this.navCtrl = navCtrl;
  }

  //lists all open questions
  listOpenQuestions() {
    //debugger;
    this.questionsService.getOpenQuestions().subscribe(questions => {
      this.openquestions = questions;
    });
  }

  //NOT USED YET - get a specific question depending on question ID 
  getOpenQuestion(id : number) {
    this.questionsService.getOpenQuestionWithId(id).subscribe( questions => {
      var openquestion = questions;
    }
    )
  }
}
