import { Component, ViewEncapsulation, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { switchMap } from 'rxjs/operators';
import { DataService } from '../data.service';
import { ConfigService } from '../services/config.service';
import { Style } from '../style-model';
export interface Unit {
  value: string;
  viewValue: string;
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BasicInfoComponent implements OnInit {
  sectionStatement: string;
  currentStyle: Style;
  background: string;
  gender: string;
  height: number;
  weight: number;
  braSize: number;
  cupSize: number;
  weightUnitValue: string;
  heightUnitValue: string;
  capBraUnitValue: string;
  isHeight: boolean;
  isWeight: boolean;
  isBraSize: boolean;
  isCupSize: boolean;

  tallUnits: Unit[] = [
    { value: 'cm', viewValue: 'CM' },
    { value: 'inch', viewValue: 'INCH' },
  ];

  weightUnits: Unit[] = [
    { value: 'kg', viewValue: 'KG' },
    { value: 'lb', viewValue: 'LB' },
  ];

  basicForm = new FormGroup({
    height: new FormControl('', [
        Validators.required,
    ]),
    weight: new FormControl('', [
        Validators.required,
    ]),
    heightUnitValue: new FormControl(''),
    weightUnitValue: new FormControl(''),
    braSize: new FormControl(''),
    cupSize: new FormControl(''),
    capBraUnitValue: new FormControl(''),
  });
  matcher = new MyErrorStateMatcher();
  

  constructor(
    private data: DataService, 
    private configService: ConfigService,
    private route: ActivatedRoute,
    private router: Router) {
      this.isWeight = !1;
      this.isBraSize = !1;
      this.isCupSize = !1;
      this.newMessage();
      let g = this.route.snapshot.paramMap.get('gender');
      this.gender = g ? g: "m";
  }

  save = function () {
    if (this.basicForm.value.height.length <= 0) {
      return !0;
    }

    if (this.basicForm.value.weight.length <= 0) {
        return !0;
    }
    this.heightUnitValue = (this.basicForm.value.heightUnitValue.length > 0) ? this.basicForm.value.heightUnitValue : 'cm';
    this.weightUnitValue = (this.basicForm.value.weightUnitValue.length > 0) ? this.basicForm.value.weightUnitValue : 'kg';
    this.capBraUnitValue = (this.gender == "f" && this.basicForm.value.capBraUnitValue.length > 0) ? this.basicForm.value.capBraUnitValue : 'cm';
    if (this.heightUnitValue == 'inch') {
        this.basicForm.value.height = parseInt(this.basicForm.value.height) * 2.54;
    }

    if (this.weightUnitValue == 'lb') {
        this.basicForm.value.weight = parseInt(this.basicForm.value.weight) * 0.45;
    }

    let d = {};
    d["height"] = this.basicForm.value.height;
    d["weight"] = this.basicForm.value.weight;
    d["heightUnitValue"] = this.heightUnitValue;
    d["weightUnitValue"] = this.weightUnitValue;
    d["gender"] = this.gender;
    d["product_image_1"] = "";
    d["product_image_2"] = "";
    if(this.gender == "f") {
      d["braSize"] = this.basicForm.value.braSize;
      d["cupSize"] = this.basicForm.value.cupSize;
    }
    this.configService.setData(d)
    this.router.navigate(['/measurements']);
  };
  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.sectionStatement = message);
    this.data.currentStyle.subscribe(style => this.currentStyle = JSON.parse(style));
    // this.data.currentGender.subscribe(gender => this.gender = gender);
  }

  newMessage() {
    this.data.changeMessage('LET’S START AND GET YOUR BEST FIT IN SECONDS!');
  }

}
