import {Component} from '@angular/core';
import {ViewController} from 'ionic-angular';

@Component({
  templateUrl: 'build/about/about-modal.component.html'
})
export class AboutModalComponent {
  constructor(private viewCtrl: ViewController) { }

  closeModal(): void {
    this.viewCtrl.dismiss();
  }
}
