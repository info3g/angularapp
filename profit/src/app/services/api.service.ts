import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpErrorResponse  } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json;charset=utf-8"
  })
};

export interface BestFitTop {
  bustMeasurements: Array<number>,
  sizes: Array<number>;
  waistMeasurements: Array<number>,
  profileBust: any,
  profileWaist: any,
}

export interface BestFitBottom {
  sizes: Array<number>;
  waistMeasurements: Array<number>,
  hipMeasurements: Array<number>,
  profileWaist: any,
  profilehip: any,
}

export interface BestFitDress {
  bustMeasurements: Array<number>,
  sizes: Array<number>;
  waistMeasurements: Array<number>,
  profileBust: any,
  profileWaist: any,
  hipMeasurements: Array<number>,
  profilehip: any,
}

export interface BestFitMeasurement {
  sizeDict: any,
  profileSize: any
}


@Injectable()
export class APIService {
  API_URL: string;
  constructor(private http: HttpClient) {
    this.API_URL = "https://alomafitnewapp.herokuapp.com";
  }

  getBrands(gender: string) {
    return this.http.get(this.API_URL + "/brands/?gender="+gender);
  }

  getProductTypes(brand, gender) {
    return this.http.get(this.API_URL + "/brands/product_type_or_size/?brand=" + brand + "&gender=" + gender);
  }
  
  getProductSizes(brandName, productType, gender) {
    return this.http.get(this.API_URL + "/brands/product_type_or_size/?brand=" + brandName + "&product_type=" + productType + "&gender=" + gender);
  }

  getBestFitTopAPI(bestfittop: BestFitTop): Observable<any> {
    return this.http.post<BestFitTop>(this.API_URL + "/GetBestFitTop", bestfittop)
  }

  getBestFitBottomAPI(bestfitbottom: BestFitBottom): Observable<any> {
    return this.http.post<BestFitBottom>(this.API_URL + "/GetBestFitBottom", bestfitbottom)
  }

  getBestFitDressAPI(bestfitdress: BestFitDress): Observable<any> {
    return this.http.post<BestFitDress>(this.API_URL + "/GetBestFitDress", bestfitdress)
  }

  getBestFitAPI(d): Observable<any> {
    return this.http.post(this.API_URL + "/GetMeasurements", d);
  }

}