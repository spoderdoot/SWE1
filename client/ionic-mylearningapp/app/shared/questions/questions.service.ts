import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Question} from './question.model';
import {Settings, SettingsService} from '../settings/index';

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

  getQuestionWithId(id: number): Observable<Question> {
    return this.http
      .get(this.settings.serverIp + 'question/' + id)
      .map((res: Response) => res.json());
  }

  createQuestion(question: Question): Observable<any> {
    console.log(JSON.stringify(question));
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http
      .put(this.settings.serverIp + 'question/create', JSON.stringify(question), { headers: headers })
      .map((res: Response) => res.json());
  }
}
