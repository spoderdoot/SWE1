import { Component } from '@angular/core';
import { OpenQuestion, QuestionsService} from '../shared/index';
import { NavController } from 'ionic-angular';
import { ListOQComponent} from './index';



@Component({
  templateUrl: 'build/question/listOQoverview.component.html',
  providers: [QuestionsService],
})
export class ListOQOverviewComponent {
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
  showDetails() {
    this.navCtrl.push(ListOQComponent);
  }
}
