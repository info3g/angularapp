import { Component, OnInit, ɵConsole, ElementRef } from '@angular/core';
import { DataService } from '../data.service';
import { Router} from '@angular/router';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { Style } from '../style-model';
import { ConfigService } from '../services/config.service';
import { APIService } from '../services/api.service';
// import {MyErrorStateMatcher} from '../error.state.matcher';
import {ErrorStateMatcher} from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-measurements',
  templateUrl: './measurements.component.html',
  styleUrls: ['./measurements.component.css']
})
export class MeasurementsComponent implements OnInit {
  sectionStatement: string;
  currentStyle: Style;
  brandName: string;
  productType: string;
  gender: string;
  size: string;
  sizes: [];
  brands: [];
  basic: any;
  error: any;
  productTypes: [];
  // sizes: Option[] = [
  //   { value: 'x-large', viewValue: 'X Large' },
  //   { value: 'large', viewValue: 'Large' },
  // ];

  // productTypes: Option[] = [
  //   { value: 'shirt', viewValue: 'shirt' },
  //   { value: 't-shirt', viewValue: 'T-Shirt' },
  // ];

  measurementForm = new FormGroup({
    brandName: new FormControl('', [
      Validators.required,
    ]),
    productType: new FormControl('', [
      Validators.required,
    ]),
    size: new FormControl('', [
      Validators.required,
    ]),
  })

  matcher = new MyErrorStateMatcher();

  constructor(
    private data: DataService,
    private configService: ConfigService, 
    private apiSerive: APIService,
    private router: Router,
    private el: ElementRef) {
    this.newMessage();
  }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.sectionStatement = message);
    this.data.currentStyle.subscribe(style => this.currentStyle = JSON.parse(style));
    this.basic = this.configService.getData();
    this.gender = (this.basic && this.basic.gender == "f") ? "female": "male";
    this.getBrands();
  }

  getBrands = function() {
    this.apiSerive.getBrands(this.gender)
      .subscribe(res => {this.brands = this.getSortedData(res, 'brand')}, // success path
        error => this.error = error // error path
    );
  }

  getProductTypes = function(brandName) {
    this.apiSerive.getProductTypes(brandName, this.gender)
      .subscribe(res => {this.productTypes = this.getSortedData(res, 'product_type')}, // success path
        error => this.error = error // error path
    );
  }

  getProductSizes = function(brandName, productType) {
    this.apiSerive.getProductSizes(brandName, productType, this.gender)
      .subscribe(res => {this.sizes = (res.length > 0) ? res : [{
        "part": "waist",
        "measurements": "30.00",
        "sizes": "14W"
    },]}, // success path
        error => this.error = error // error path
    );
  }

  getSortedData = function(items, prop) {
    let d = [];
    let t = [];
    if (items.length) {
      for (var i=0; i<items.length; i++) {
        let b = items[i];
        if (t.includes(b[prop])) {
          continue;
        } else {
          t.push(b[prop]);
          d.push(b);
        }
      }
    } else {
      d = [{
        "product_type": "all"
      }]
    }
    return d.sort((a,b) => (a.brand > b.brand) ? 1 : ((b.brand > a.brand) ? -1 : 0));
  }

  onBrandInput = function(value: string) {
    this.brandName = value;
    this.getProductTypes(value);
  }

  onProductChange = function(value: string) {
    this.productType = value;
    this.getProductSizes(this.brandName, value);
  }

  newMessage() {
    this.data.changeMessage('HOW FAT CONCENTRATE IN YOUR BODY PARTS');
  }

  save = function () {
    // if (this.measurementForm.value.brandName.length <= 0) {
    //   const brandElement = this.el.nativeElement.querySelectorAll('#brandName');
    //   if (brandElement) {
    //     brandElement[0].focus();
    //     brandElement[0].blur()
    //   }
    //   return !1;
    // }
    // if (this.measurementForm.value.productType.length <= 0) {
    //   const productTypeElement = this.el.nativeElement.querySelectorAll('#productType');
    //   if (productTypeElement) {
    //     productTypeElement[0].focus();
    //     productTypeElement[0].blur()
    //   }
    //   return !1;
    // }
    // if (this.measurementForm.value.size.length <= 0) {
    //   const sizeElement = this.el.nativeElement.querySelectorAll('#size');
    //   if (sizeElement) {
    //     sizeElement[0].focus();
    //     sizeElement[0].blur()
    //   }
    //   return !1;
    // }
    //  // temp data:
    // if (this.basic == undefined) {
    //   this.basic = {};
    // }
    
    // if (this.basic) {
    //   this.basic.brandName = this.measurementForm.value.brandName;
    //   this.basic.productType = this.measurementForm.value.productType;
    //   this.basic.size = this.measurementForm.value.size.sizes;
    //   this.configService.setData(this.basic);
    // }

    this.router.navigate(['/fat']);
  };
}
