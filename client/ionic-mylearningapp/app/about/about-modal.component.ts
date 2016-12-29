import {Component} from '@angular/core';
import {ViewController} from 'ionic-angular';

// about class is used to show some general information about instalearn 
@Component({
  templateUrl: 'build/about/about-modal.component.html'
})
export class AboutModalComponent {
  constructor(private viewCtrl: ViewController) { }

  closeModal(): void {
    this.viewCtrl.dismiss();
  }
}
