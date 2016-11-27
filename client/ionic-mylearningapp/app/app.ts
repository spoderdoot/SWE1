import { Component, ViewChild } from '@angular/core';
import { ionicBootstrap, ModalController, Platform, Nav } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { AboutModalComponent } from './about/index';
import { QuizComponent } from './quiz/index';
import { CreateQuestionComponent, ListQuestionsComponent } from './question/index';
import { SettingsComponent } from './settings/index';
//import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';

@Component({
  templateUrl: 'build/app.html'
})
class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = QuizComponent;

  pages: Array<{ title: string, icon: string, component: any }>;

  constructor(public platform: Platform, private modalCtrl: ModalController) {
    this.initializeApp();

    //ion-icon - https://ionicframework.com/docs/v2/ionicons/
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Registrierung', icon: 'people', component: RegisterComponent},
      { title: 'Spielen', icon: 'bulb', component: QuizComponent },
      { title: 'Frage erstellen', icon: 'create', component: CreateQuestionComponent },
      { title: 'Fragen anzeigen', icon: 'list', component: ListQuestionsComponent },
      { title: 'Einstellungen', icon: 'settings', component: SettingsComponent },
      { title: 'Über uns', icon: 'people', component: AboutModalComponent }
    //  { title: 'Login', icon: '', component: LoginComponent}

    //  { title: 'Fragen verwalten', icon: '', component: AdminComponent}
    //  { title: 'Benutzer verwalten', icon: '', component: AdminComponent}
    //  { title: 'Spielauswertungen', icon: '', component: ResultsComponent}
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
