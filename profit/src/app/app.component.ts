import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { TranslateService } from '@ngx-translate/core';
import {Style} from './style-model';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public  style: Style;
  public  gender: string;
  sectionStatement: string;
  constructor(
    private data: DataService,
    private translate: TranslateService, 
    private router: Router, 
    private route: ActivatedRoute) {
      this.style = new  Style();
      this.style.primary_background_color = '#ffb116';
      this.style.primary_text_color = '#fff';
      translate.setDefaultLang('en');
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      if (params.has('g')) {
       this.gender = params.get('g');
       this.changeGender();
      }
    });

    this.data.currentMessage.subscribe(message => this.sectionStatement = message);
    this.changeStyle();

  }

  useLanguage(language: string) {
    this.translate.use(language);
  }
  changeStyle() {
   this.data.changeTheme(this.style);
  }
  changeGender() {
    this.data.changeGender(this.gender);
  }

}
