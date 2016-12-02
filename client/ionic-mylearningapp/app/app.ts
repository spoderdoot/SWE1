import { Component, ViewChild } from '@angular/core';
import { ionicBootstrap, ModalController, Platform, Nav } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { AboutModalComponent } from './about/index';
import { QuizComponent } from './quiz/index';
import { CreateQuestionComponent, ListQuestionsComponent, DeleteQuestionComponent, EditQuestionComponent, ManageQuestionComponent } from './question/index';
import { SettingsComponent } from './settings/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';

@Component({
  templateUrl: 'build/app.html'
})
class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = QuizComponent;

  pages: Array<{ title: string, icon: string, component: any }>;

  isTeacher : boolean = false;

  constructor(public platform: Platform, private modalCtrl: ModalController) {
    this.initializeApp();

    /*if(this.isTeacher) {
      this.pages = [
        { title: 'Fragen verwalten', icon: 'game-controller-b', component: ManageQuestionComponent },
        // {title: 'Spielauswertungen anzeigen', icon: 'statistics', component: GameResultsComponent},
        { title: 'Einstellungen', icon: 'settings', component: SettingsComponent },
        { title: 'Über uns', icon: 'at', component: AboutModalComponent }
      ]
    }
    if(!this.isTeacher) {
      this.pages = [
        { title: 'Login', icon: 'person', component: LoginComponent}, //maybe I can comibne Login with Play function
        { title: 'Spielen', icon: 'game-controller-b', component: QuizComponent },
        { title: 'Einstellungen', icon: 'settings', component: SettingsComponent },
        { title: 'Über uns', icon: 'at', component: AboutModalComponent }
      ]
    } */
    
    //ion-icon - https://ionicframework.com/docs/v2/ionicons/
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Registrierung', icon: 'person-add', component: RegisterComponent},
      { title: 'Login', icon: 'person', component: LoginComponent}, //maybe I can comibne Login with Play function
      { title: 'Spielen', icon: 'game-controller-b', component: QuizComponent },
      { title: 'Fragen verwalten', icon: 'game-controller-b', component: ManageQuestionComponent },
      { title: 'Frage erstellen', icon: 'create', component: CreateQuestionComponent },//Putting them all together in something like "question options" would be nice
      { title: 'Fragen anzeigen', icon: 'list', component: ListQuestionsComponent },
      { title: 'Frage ändern', icon: 'brush', component: EditQuestionComponent },
      { title: 'Frage löschen', icon: 'trash', component: DeleteQuestionComponent },
      { title: 'Einstellungen', icon: 'settings', component: SettingsComponent },
      { title: 'Über uns', icon: 'at', component: AboutModalComponent }



    //  { title: 'Fragen verwalten', icon: '', component: AdminComponent}
    //  { title: 'Benutzer verwalten', icon: '', component: AdminComponent}
    //  { title: 'Spielauswertungen', icon: '', component: ResultsComponent}
    //für statistiken icon: 'stats' 'trophy'
    //vlt school für "spielen"
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openAboutModal() {
    const modal = this.modalCtrl.create(AboutModalComponent);
    modal.present()
  }

  open(page) {

    if (page.component == AboutModalComponent) {
      this.openAboutModal();
      return;
    }
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}

ionicBootstrap(MyApp);
