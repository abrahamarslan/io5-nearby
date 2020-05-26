import { Component } from '@angular/core';
import {NavController, Platform} from "@ionic/angular";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GeocoderService} from "../geocoder.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  //Public variables
  public form: FormGroup;
  public geoForm: FormGroup;
  public geocoded: boolean;                         //Geocoded or not?
  public results: string;                           //Geocoding results
  public filter: string = 'Search by co-ordinates';
  public displayForwardForm: boolean = true;
  public displayReverseForm: boolean = false;
  public curLat:any;
  public curLng: any;
  public curAccuracy: any;

  constructor(public navCtrl: NavController, public geocoder: GeocoderService, private _fb: FormBuilder, private _platform: Platform) {
      this.form = _fb.group({
          'keyword': ['', Validators.required]
      });

      this.geoForm = _fb.group({
          'latitude': ['', Validators.required],
          'longitude': ['', Validators.required],
      });
  }

    /**
     * Display form options
     */
      filterForm() {
        if(this.displayForwardForm) {
          this.filter = 'Search by keyword';
          this.displayReverseForm = true;
          this.displayForwardForm = false;
        } else {
          this.filter = 'Search by co-ordinates';
          this.displayReverseForm = false;
          this.displayForwardForm = true;
        }
    }
    /**
     * @public
     * @return {none}
     */
    reverseGeocode(val) {
      this._platform.ready().then((data: any) => {
          let latitude: any = parseFloat(this.geoForm.controls["latitude"].value),
              longitude: any = parseFloat(this.geoForm.controls["longitude"].value);
          this.geocoder.reverseGeocode(latitude, longitude)
              .then((data: any) => {
                this.geocoded = true;
                this.results = data;
              })
              .catch((error: any) => {
                  this.geocoded = false;
                  this.results = error.message;
              });
      })
      .catch((error: any) => {
        //Todo: Display and log error information
        this.geocoded = false;
        this.results = error.message;
      });
    }


    /**
     * @public
     * @return {none}
     */
    forwardGeocode(val) {
        console.log(val);
        this._platform.ready().then((data: any) => {
            let keyword: string = this.form.controls["keyword"].value;
            this.geocoder.forwardGeocode(keyword)
                .then((data: any) => {
                    this.geocoded = true;
                    this.results = data;
                })
                .catch((error: any) => {
                    this.geocoded = false;
                    this.results = error.message;
                });
        })
        .catch((error: any) => {
            //Todo: Display and log error information
            this.geocoded = false;
            this.results = error.message;
        });
    }

    /**
     * @public
     * @return {none}
     */
    getGeolocation() {
        this._platform.ready().then((data: any) => {
            this.geocoder.getGeolocation()
                .then((data: any) => {
                    this.geocoded = true;
                    this.curLat = data?.coords.latitude;
                    this.curLng = data?.coords.longitude;
                    this.curAccuracy = data?.coords.accuracy;
                    this.results = `Latitude: ${this.curLat}  Longitude: ${this.curLng}  Accuracy: ${this.curAccuracy}`;
                })
                .catch((error: any) => {
                    this.geocoded = false;
                    this.results = error.message;
                });
        })
            .catch((error: any) => {
                //Todo: Display and log error information
                this.geocoded = false;
                this.results = error.message;
            });
    }

}
