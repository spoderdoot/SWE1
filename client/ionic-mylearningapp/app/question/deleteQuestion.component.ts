import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Question, QuestionsService} from '../shared/index';


@Component({
  templateUrl: 'build/question/deleteQuestion.component.html',
  providers: [QuestionsService],
})
export class DeleteQuestionComponent { }
