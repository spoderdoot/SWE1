import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {QuizRules, GeneralQuestion, Question, OpenQuestion, MultipleChoiceQuestion} from './index';

import {Settings, SettingsService} from '../settings/index';

//question service provides the connection between server and client through REST
@Injectable()
export class QuestionsService {
  private static settingsService: SettingsService = SettingsService.getInstance();
  private settings: Settings;

  constructor(private http: Http) {
    this.loadSettings();
  }

  private loadSettings() {
    QuestionsService.settingsService.loadSettings().then(settings => {
      this.settings = settings;
    });
  }

  getQuestions(): Observable<Question[]> {

    console.log("getQuestions - ServerIp: " + this.settings.serverIp);

    return this.http
      .get(this.settings.serverIp + 'listQuestions')
      .map((res: Response) => res.json());
  }


  // used to get the questions for quiz depedning on set category and set number of questions
  getQuizQuestions(quizrules : QuizRules) : Observable<any> {
    console.log("quiz questions with rules: category " + quizrules.category + " and number of questions " + quizrules.numberOfQuestions);
    console.log(JSON.stringify(quizrules));
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http
      .put(this.settings.serverIp + 'listQuizQuestions', JSON.stringify(quizrules), {headers : headers})
      .map((res: Response) => res.json());
  }


  //used to list all open questions
  getOpenQuestions(): Observable<OpenQuestion[]> {

    console.log("getOpenQuestions - ServerIp: " + this.settings.serverIp);

    return this.http
      .get(this.settings.serverIp + 'listAllOpenQuestions')
      .map((res: Response) => res.json());
  }

  //used to list all multiple choice questions
  getMultipleChoiceQuestions(): Observable<MultipleChoiceQuestion[]> {

    console.log("getMultipleQuestions - ServerIp: " + this.settings.serverIp);

    return this.http
      .get(this.settings.serverIp + 'listAllMultipleChoiceQuestions')
      .map((res: Response) => res.json());
  }



  //NOT USED YET, but might be important for edit questions
  getQuestionWithId(id: number): Observable<Question> {
    return this.http
      .get(this.settings.serverIp + 'question/' + id)
      .map((res: Response) => res.json());
  }

  //used for getting an open question depending on its ID
  getOpenQuestionWithId(id: number) : Observable<OpenQuestion> {
    return this.http
      .get(this.settings.serverIp + 'openquestion/' + id)
      .map((res: Response) => res.json());
  }

  //used for getting a MCQ depending on its ID
  getMultipleChoiceQuestionWithId(id: number) : Observable<OpenQuestion> {
    return this.http
      .get(this.settings.serverIp + 'multiplechoicequestion/' + id)
      .map((res: Response) => res.json());
    }


  //used for creating questions
  createQuestion(question: Question): Observable<any> {
    console.log(JSON.stringify(question));
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http
      .put(this.settings.serverIp + 'question/create', JSON.stringify(question), { headers: headers })
      .map((res: Response) => res.json());
  }

  //used for creating open questions
  createOpenQuestion(openQuestion : OpenQuestion) : Observable<any> {
    console.log(JSON.stringify(openQuestion));
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http
    .put(this.settings.serverIp + 'openquestion/create', JSON.stringify(openQuestion), {headers : headers})
    .map((res : Response) => res.json());
  }

  //used for creating MCQ
  createMultipleChoiceQuestion(multipleChoiceQuestion : MultipleChoiceQuestion) : Observable<any> {
    console.log(JSON.stringify(multipleChoiceQuestion));
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http
    .put(this.settings.serverIp + 'multiplechoicequestion/create', JSON.stringify(multipleChoiceQuestion), {headers : headers})
    .map((res : Response) => res.json());
  }

}
