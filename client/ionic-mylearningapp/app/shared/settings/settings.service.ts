import {Injectable} from '@angular/core';
import {Storage, LocalStorage} from 'ionic-angular';
import {Settings} from './settings.model';
import {Observable} from 'rxjs/Observable';

const settingsKey: string = 'appSettings';
const defaultServerIp: string = 'http://localhost:8080/ila/';  //ila = InstaLearnApp

@Injectable()
export class SettingsService {

  private localStorage: LocalStorage;
  private static _instance: SettingsService = new SettingsService();

  constructor() {
    if (SettingsService._instance) {
      throw new Error("Not available for singletons!");
    }
    SettingsService._instance = this;
    this.localStorage = new Storage(LocalStorage);
  }

  public static getInstance(): SettingsService {
    return SettingsService._instance;
  }

  saveSettings(settings: Settings) {
    console.log("saveSettings()" + JSON.stringify(settings));
    this.localStorage.set(settingsKey, JSON.stringify(settings));
  }

  loadSettings(): Promise<Settings> {
    console.log("loadSettings()");
    return this.localStorage.get(settingsKey).then((value) => {

      if (value == null) {
        console.log("no settings available - create default");
        let defaultSettings = new Settings();
        defaultSettings.serverIp = defaultServerIp;
        this.saveSettings(defaultSettings);
        return defaultSettings;
      }

      console.log("loaded settings - " + value);
      return JSON.parse(value);
    });
  }
}
