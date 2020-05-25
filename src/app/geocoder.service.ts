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

  /**
   *
   * A forward geo-code feature.
   * Detect location and return (lat,long) data
   *
   * @public
   * @method forwardGeocode
   * @return {Promise}
   *
   */
    forwardGeocode(keyword: string): Promise<any> {
      return new Promise<any>((resolve,reject) => {
          this._geocoder.forwardGeocode(keyword)
              .then((coordinates:NativeGeocoderResult) => {
                  let str:string = `The co-ordinates are (${coordinates.latitude}, ${coordinates.longitude})`;
                  resolve(str);
              })
              .catch((error:any) => {
                  console.log(error);
                  reject(error);
              });
      });
  }

    /**
     *
     * A reverse geo-code feature.
     * Translate (lat,lng) into approximate address
     *
     * @public
     * @method reverseGeocode
     * @return {Promise}
     *
     */
    reverseGeocode(lat: number, lng: number): Promise<any> {
        return new Promise<any>((resolve,reject) => {
            this._geocoder.reverseGeocode(lat, lng)
                .then((result:NativeGeocoderResult) => {
                    let str:string = `The reversed geo-code addrss is (${result.locality}, ${result.countryCode})`;
                    resolve(str);
                })
                .catch((error:any) => {
                    console.log(error);
                    reject(error);
                });
        });
    }
}
