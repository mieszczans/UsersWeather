import { WeatherApiService } from './../services/weather-api.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../user/user';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  user: User;
  forecast;

  constructor(private route: ActivatedRoute, private weatherS: WeatherApiService) { }

  ngOnInit() {
    this.route.data.subscribe(
      (data: Data) => {
        this.user = data['user'];
      }
    );
    this.getWOEID();
    this.getForecast();
  }
  getWOEID(): void {
    this.weatherS.makeWoeidURL(this.user.city);
    this.saveWoeidObject();
  }

  saveWoeidObject() {
    this.weatherS.findCityWoeid()
    .subscribe(
      (obj) => this.weatherS.saveWoeidObject(obj),
      () => console.log('Can not get woeid object')
    );
  }

  getForecast() {
    this.weatherS.getForecastFromAPI()
    .subscribe(
      (data) => {
        this.forecast = data;
        console.log(data);
      },
      () => console.log('Sorry can not get forecast')
    );
  }
}
