import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Question, QuestionsService} from '../shared/index';

//NOT IMPLEMENTED YET -used for editting questions
@Component({
  templateUrl: 'build/question/editQuestion.component.html',
  providers: [QuestionsService],
})
export class EditQuestionComponent { }
