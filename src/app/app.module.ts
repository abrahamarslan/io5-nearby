import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import {HttpClientModule} from "@angular/common/http";
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

//Import external components
import {NativeGeocoder} from "@ionic-native/native-geocoder/ngx";

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

//Services
import {GeocoderService} from "./geocoder.service";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, ReactiveFormsModule, FormsModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [
    StatusBar,
    SplashScreen,
    NativeGeocoder,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    GeocoderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
