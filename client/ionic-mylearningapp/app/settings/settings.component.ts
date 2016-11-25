import { Component, OnInit } from '@angular/core';
import { Settings, SettingsService, LoadingIndicator, LoadingPage} from '../shared/index';

@Component({
  templateUrl: 'build/settings/settings.component.html',
  providers: [SettingsService],
  directives: [LoadingIndicator]
})
export class SettingsComponent extends LoadingPage {
  private static settingsService: SettingsService = SettingsService.getInstance();
  private settings: Settings;

  constructor() {
    super(true); // sets loading to true
  }

  ngOnInit() {
    SettingsComponent.settingsService.loadSettings().then(settings => {
      this.settings = settings;
      this.ready(); // sets loading to false
    });
  }

  saveSettings() {
    console.log("saveSettings");
    SettingsComponent.settingsService.saveSettings(this.settings);
  }
}
