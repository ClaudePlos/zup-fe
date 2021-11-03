import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {ApplicationComponent} from './containers/application/application.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from './material.module';
import {StoreModule} from '@ngrx/store';
import {ZupReducer} from './store/reducer';
import {EffectsModule} from '@ngrx/effects';
import {ZupEffects} from './store/effects';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {NewApplicationComponent} from './containers/new-application/new-application.component';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import { HomeComponent } from './containers/home/home.component';
import { ShowApplicationComponent } from './containers/show-application/show-application.component';
import { LoginComponent } from './containers/login/login.component';
import {MAT_DATE_FORMATS} from "@angular/material/core";
import {MY_DATE_FORMATS} from "./utils/dates/my-date-formats";
import {DatePipe} from "@angular/common";
import { DialogInfoComponent } from './components/dialog-info/dialog-info.component';
import {MatSelectFilterModule} from "mat-select-filter";

@NgModule({
  declarations: [
    AppComponent,
    ApplicationComponent,
    NewApplicationComponent,
    HomeComponent,
    ShowApplicationComponent,
    LoginComponent,
    DialogInfoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    StoreModule.forRoot({zupStore: ZupReducer}),
    EffectsModule.forRoot([ZupEffects]),
    FormsModule,
    RouterModule,
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    MatSelectFilterModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
