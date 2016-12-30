import { Component, ViewChild } from '@angular/core';
import { ionicBootstrap, ModalController, Platform, Nav } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { AboutModalComponent } from './about/index';
import { QuizRulesComponent } from './quiz/index';
import { CreateMCQComponent, CreateOQComponent, CreateQuestionComponent, ListQuestionsComponent, EditQuestionComponent, ManageQuestionComponent } from './question/index';
import { SettingsComponent } from './settings/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';

@Component({
  templateUrl: 'build/app.html'
})
class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginComponent;

  pages: Array<{ title: string, icon: string, component: any }>;
  pagesTeacher: Array<{ title: string, icon: string, component: any }>;
  pagesStudent: Array<{ title: string, icon: string, component: any }>;
  //loginPage
  isTeacher : boolean = false;
  isLoggedIn : boolean = false;

  constructor(public platform: Platform, private modalCtrl: ModalController) {
    this.initializeApp();


    /*if(this.isTeacher && this.isLoggedIn) {
      this.pagesTeacher = [
        { title: 'Fragen verwalten', icon: 'game-controller-b', component: ManageQuestionComponent },

        { title: 'Einstellungen', icon: 'settings', component: SettingsComponent },
        { title: 'Über uns', icon: 'at', component: AboutModalComponent }
      ]
    }
    if(!this.isTeacher && this.isLoggedIn) {
      this.pagesStudent = [
        { title: 'Spielen', icon: 'game-controller-b', component: QuizComponent },
        { title: 'Einstellungen', icon: 'settings', component: SettingsComponent },
        { title: 'Über uns', icon: 'at', component: AboutModalComponent }
      ]
    } */

    //ion-icon - https://ionicframework.com/docs/v2/ionicons/
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Login', icon: 'person', component: LoginComponent}, //maybe I can comibne Login with Play function
      { title: 'Spielen', icon: 'game-controller-b', component: QuizRulesComponent },
      { title: 'Fragen verwalten', icon: 'create', component: ManageQuestionComponent },
      { title: 'Einstellungen', icon: 'settings', component: SettingsComponent },
      { title: 'Über uns', icon: 'at', component: AboutModalComponent },
    ];

    this.pagesTeacher = [
      { title: 'Fragen verwalten', icon: 'game-controller-b', component: ManageQuestionComponent },
      { title: 'Einstellungen', icon: 'settings', component: SettingsComponent },
      { title: 'Über uns', icon: 'at', component: AboutModalComponent },
    ];

    this.pagesStudent = [
      { title: 'Spielen', icon: 'game-controller-b', component: QuizRulesComponent },
      { title: 'Einstellungen', icon: 'settings', component: SettingsComponent },
      { title: 'Über uns', icon: 'at', component: AboutModalComponent },
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
