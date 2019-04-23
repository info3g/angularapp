import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { Router} from '@angular/router';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { DataService } from '../data.service';
import { ConfigService } from '../services/config.service';
export interface FatOption {
  value: string;
  viewValue: string;
  src: string;
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-fat',
  templateUrl: './fat.component.html',
  styleUrls: ['./fat.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class FatComponent implements OnInit {
  sectionStatement: string;
  selectedFat: string ;
  gender: string;
  m_data: any;
  isSelected: boolean;
  fatArray: FatOption [];
  fatArrayF: FatOption [] = [
    { value: 'avarage', viewValue: 'Avarage', src: './../../assets/img/svg/Female_1.svg' },
    { value: 'tummy', viewValue: 'Tummy' , src: './../../assets/img/svg/Female_2.svg' },
    { value: 'hips', viewValue: 'Hips' , src: './../../assets/img/svg/Female_3.svg' },
    { value: 'not_sure', viewValue: 'Not Sure' , src: './../../assets/img/svg/Female_4.svg' }
  ];
  fatArrayM: FatOption [] = [
    { value: 'avarage', viewValue: 'Avarage', src: './../../assets/img/svg/Male_1.svg' },
    { value: 'tummy', viewValue: 'Tummy' , src: './../../assets/img/svg/Male_2.svg' },
    { value: 'hips', viewValue: 'Hips' , src: './../../assets/img/svg/Male_3.svg' },
    { value: 'not_sure', viewValue: 'Not Sure' , src: './../../assets/img/svg/Male_4.svg' }
  ];

  fatForm = new FormGroup({
    selectedFat: new FormControl('', [
      Validators.required,
    ]),
  })

  constructor(
    private data: DataService,
    private configService: ConfigService,  
    private router: Router) {
    this.newMessage();
    this.isSelected = !1;
  }
  
  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.sectionStatement = message);
    this.data.currentGender.subscribe(gender => this.gender = gender);
    this.m_data = this.configService.getData();
    this.gender = this.m_data ? this.m_data.gender: "m";
    this.fatArray = (this.gender === 'f') ? this.fatArrayF : this.fatArrayM;
  }

  onChange($event) {
    this.isSelected = !1;
  }

  save = function () {
    // if (this.fatForm.value.selectedFat.length <= 0) {
    //   this.isSelected = !0;
    //   return !1;
    // }
    // if (this.m_data) {
    //   this.m_data.selectedFat = this.fatForm.value.selectedFat.value;
    //   this.configService.setData(this.m_data);
    // }
    this.router.navigate(['/result']);
  };

  newMessage() {
    this.data.changeMessage('LET’S START AND GET YOUR BEST FIT IN SECONDS!');
  }

}
