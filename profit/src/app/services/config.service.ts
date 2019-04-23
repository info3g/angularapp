import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class ConfigService {
  p: any;
  constructor(private http: HttpClient) {}

  setData(d: any) {  
    this.p = d;
  } 

  getData() {
    return this.p;  
  }

  getConfig(url: string) {
    return this.http.get(url);
  }
  
}