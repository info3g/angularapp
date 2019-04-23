import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasicInfoComponent } from './basic-info/basic-info.component';
import {MeasurementsComponent} from './measurements/measurements.component' ;
import {FatComponent} from './fat/fat.component' ;
import {ResultComponent} from './result/result.component' ;

const routes: Routes = [
  { path: '', component: BasicInfoComponent },
  { path: 'measurements', component: MeasurementsComponent },
  { path: 'fat', component: FatComponent },
  { path: 'result', component: ResultComponent },
  { path: ':gender', component: BasicInfoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
