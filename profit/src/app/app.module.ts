import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BasicInfoComponent } from './basic-info/basic-info.component';
import { MeasurementsComponent } from './measurements/measurements.component';
import { FatComponent } from './fat/fat.component';
import { ResultComponent } from './result/result.component';
import {DataService} from './data.service';
import {ConfigService} from './services/config.service';
import {APIService} from './services/api.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule, MatSelectModule, MatInputModule, MatIconModule, MatToolbarModule, MatButtonModule, MatAutocompleteModule } from '@angular/material';
import {MatGridListModule, MatRadioModule} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { Ng5SliderModule } from 'ng5-slider';
@NgModule({
  declarations: [
    AppComponent,
    BasicInfoComponent,
    MeasurementsComponent,
    FatComponent,
    ResultComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatAutocompleteModule,
    MatGridListModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng5SliderModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  })

  ],
  providers: [DataService, ConfigService, APIService],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
