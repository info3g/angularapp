import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Style} from './style-model';
@Injectable()
export class DataService {

  private messageSource = new BehaviorSubject('');
  private styleSource  = new BehaviorSubject('');
  private genderSource = new BehaviorSubject('');
  currentMessage = this.messageSource.asObservable();
  currentStyle  = this.styleSource.asObservable();
  currentGender = this.genderSource.asObservable();
  constructor() { }

  changeMessage(message: string) {
    this.messageSource.next(message);
  }

  changeGender(gender: string) {
    this.genderSource.next(gender);
  }

  changeTheme(style: Style) {
    this.styleSource.next(JSON.stringify(style));
  }

}
