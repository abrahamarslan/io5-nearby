import { Injectable } from '@angular/core';
import {NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions} from "@ionic-native/native-geocoder/ngx";
import {HttpClient, HttpHeaders, HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GeocoderService {

  constructor(public http: HttpClient, private _geocoder: NativeGeocoder) {
    //Todo: Add more method magic
  }

}
