import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Options } from 'ng5-slider';
import * as $ from 'jquery';
import { Style } from '../style-model';
import { DataService } from '../data.service';
import { ConfigService } from '../services/config.service';
import { APIService } from '../services/api.service';

export interface dataOptions {
  "bustMeasurements": object,
  "sizes": object,
  "waistMeasurements": object,
  "profileBust": object,
  "profileWaist": object,
}

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ResultComponent implements OnInit {
  resultValue: number;
  currentStyle: Style;
  profileSize: string;
  best_product: any;
  r_data: any;
  size: string;
  error: any;
  
  constructor(
    private data: DataService,
    private configService: ConfigService,
    private apiSerive: APIService,
    ) {
      // this.getBestFitTop(); 
      // this.getProducts();
      // this.getBestFitBootom();
      // this.getBestFitDress();
     }

  ngOnInit() {
    this.data.currentStyle.subscribe(style => this.currentStyle = JSON.parse(style));
    this.r_data = this.configService.getData();
    this.size = this.r_data ? this.r_data.size: null;
    this.r_data ? this.getBestFitMeasurement(): null;

    $(document).ready(function() {
      var sheet = document.createElement('style'),
      $rangeInput = $('.range input'),
      prefs = ['webkit-slider-runnable-track', 'moz-range-track', 'ms-track'];

      document.body.appendChild(sheet);

      var getTrackStyle = function (el) {
        var curVal = el.value,
        val = (curVal - 1) * 16.666666667,
        style = '';
        
        // Set active label
        $('.range-labels li').removeClass('active selected');
        
        var curLabel = $('.range-labels').find('li:nth-child(' + curVal + ')');
        
        curLabel.addClass('active selected');
        curLabel.prevAll().addClass('selected');
        
        // Change background gradient
        for (var i = 0; i < prefs.length; i++) {
          style += '.range {background: linear-gradient(to right, #ffb116 0%, #ffb116 ' + val + '%, #ffb116 ' + val + '%, #ffb116 100%)}';
          style += '.range input::-' + prefs[i] + '{background: linear-gradient(to right, #ffb116 0%, #ffb116 ' + val + '%, #ffb116 ' + val + '%, #ffb116 100%)}';
        }
        return style;
      };

      // $("#resultValue").val(5);
      $rangeInput.on('input', function () {
        sheet.textContent = getTrackStyle(this);
      });

      // Change input value on label click
      $('.range-labels li').on('click', function () {
        var index = $(this).index();
        $rangeInput.val(index + 1).trigger('input');
      });
    });
  }

  // getBestFitTop = function() {
  //   var formData = new FormData();
  //   formData.append("bustMeasurements", '{"data": [100,105,110,115]}');
  //   formData.append("sizes", '{"data": ["s", "m", "l", "xl"]}');
  //   formData.append("waistMeasurements", '{"data": [100,105,110,115]}');
  //   formData.append("profileBust", '{"data": 110}');
  //   formData.append("profileWaist", '{"data": 105}');    
  //   */
   
  //   const formData = new FormData();
  //   let a = {"data":[100,105,110,115]};
  //   let b = {"data":["s","x","l","xl"]};
  //   let c = {"data":[100,105,110,115]};
  //   let d = {"data":110};
  //   let e = {"data":105};
  //   formData.append('bustMeasurements', JSON.stringify(a));
  //   formData.append('sizes', JSON.stringify(b));
  //   formData.append('waistMeasurements', JSON.stringify(c));
  //   formData.append('profileBust', JSON.stringify(d));
  //   formData.append('profileWaist', JSON.stringify(e));
  //   this.apiSerive.getBestFitTopAPI(formData) 
  //     .subscribe(res => console.log(res)
  //     );
  // }

  // getBestFitBootom() {
  //   console.log("Going to get bottom fitting : ")
  //   const formData = new FormData();
  //   let a = {"data":["s","x","l","xl"]};
  //   let b = {"data":[100,105,110,115]};
  //   let c = {"data":[100,105,110,115]};
  //   let d = {"data":105};
  //   let e = {"data":110};
  //   formData.append('sizes', JSON.stringify(a));
  //   formData.append('waistMeasurements', JSON.stringify(b));
  //   formData.append('hipMeasurements', JSON.stringify(c));
  //   formData.append('profileWaist', JSON.stringify(d));
  //   formData.append('profilehip', JSON.stringify(e));
  //   this.apiSerive.getBestFitBottomAPI(formData) 
  //     .subscribe(res => console.log(res)
  //     );
  // }

  // getBestFitDress() {
  //   console.log("Going to get best fit dress : ")
  //   const formData = new FormData();
  //   let a = {"data":[100,105,110,115]};
  //   let b = {"data":["s","x","l","xl"]};
  //   let c = {"data":[100,105,110,115]};
  //   let d = {"data":110};
  //   let e = {"data":105};
  //   let f = {"data":[100,105,110,115]};
  //   let g = {"data":110};
  //   formData.append('bustMeasurements', JSON.stringify(a));
  //   formData.append('sizes', JSON.stringify(b));
  //   formData.append('waistMeasurements', JSON.stringify(c));
  //   formData.append('profileBust', JSON.stringify(d));
  //   formData.append('profileWaist', JSON.stringify(e));
  //   formData.append('hipMeasurements', JSON.stringify(f));
  //   formData.append('profilehip', JSON.stringify(g));
  //   this.apiSerive.getBestFitDressAPI(formData)
  //     .subscribe(res => console.log(res)
  //     );
  // }

  getBestFitMeasurement() {
    let size = "";
    switch (this.r_data.selectedFat) {
      case "avarage":
        size = "s";
        this.profileSize = "Small";
        $("#resultValue").val(3);
        break;
      case "tummy":
        size = "m";
        this.profileSize = "Medium";
        $("#resultValue").val(4);
        break;
      case "hips":
        size = "l";
        this.profileSize = "Large";
        $("#resultValue").val(5);
        break;
      case "not_sure":
        size = "xl";
        this.profileSize = "Extra Large";
        $("#resultValue").val(6);
        break;
    }

    const fd = new FormData();
    let a = {"data": {"sizes":["s","m","l","xl"],
                      "hips":[100,105,110,115],
                      "waists":[100,105,110,115],
                      "busts":[100,105,110,115]}}
    let b = {"data": size};
    fd.append('sizeDict', JSON.stringify(a));
    fd.append('profileSize', JSON.stringify(b));
    this.apiSerive.getBestFitAPI(fd)
      .subscribe(res => {this.best_product = res}, // success path
        error => this.error = error // error path
    );
  }

  saveMeasureMent() {
    console.log("Going to save data.");
    console.log(this.r_data);

  }

}




