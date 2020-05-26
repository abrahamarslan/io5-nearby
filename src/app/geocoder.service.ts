import { Injectable } from '@angular/core';
import {NativeGeocoder, NativeGeocoderResult,  NativeGeocoderOptions} from "@ionic-native/native-geocoder/ngx";
import {HttpClient, HttpHeaders, HttpErrorResponse} from "@angular/common/http";
import {Geolocation, Geoposition} from "@ionic-native/geolocation/ngx";

@Injectable()
export class GeocoderService {

  constructor(public http: HttpClient, private _geocoder: NativeGeocoder, private _geolocation: Geolocation) {
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
              .then((coordinates:NativeGeocoderResult[]) => {
                  let rcoordinates: any = coordinates[0];
                  let str:string = `The co-ordinates are (${rcoordinates.latitude}, ${rcoordinates.longitude})`;
                  resolve(str);
              })
              .catch((error:any) => {
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
                .then((result:NativeGeocoderResult[]) => {
                    let raddress: any = result[0];
                    let str:string = `The reversed geo-code addrss is (${JSON.stringify(raddress)})`;
                    resolve(str);
                })
                .catch((error:any) => {
                    reject(error);
                });
        });
    }


    /**
     *
     * Geolocation feature
     * Get the current device location
     *
     * @public
     * @method getGeolocation
     * @return {Promise}
     *
     */
    getGeolocation():Promise<any> {
        return new Promise<any>((resolve,reject) => {
            this._geolocation.getCurrentPosition()
                .then((data: Geoposition) => {
                    let lat = data.coords.latitude;
                    let lng = data.coords.longitude;
                    let accuracy = data.coords.accuracy;
                    resolve(data);
                })
                .catch((error:any) => {
                    reject(error);
                });
        });
    }
}
