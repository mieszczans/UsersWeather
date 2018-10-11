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
  humidity: string;
  temperature: string;

  constructor(private route: ActivatedRoute, private weatherS: WeatherApiService) { }

  ngOnInit() {
    this.route.data.subscribe(
      (data: Data) => {
        this.user = data['user'];
      }
    );
    this.getForecast();
  }


  getForecast() {
    this.weatherS.makeURLCityWeather(this.user.city);
    this.weatherS.getForecastFromAPI()
    .subscribe(
      (data) => {
        this.forecast = data;
        this.getDesiredWeatherData(data);
      },
      () => console.log('Sorry can not get forecast')
    );
  }

  getDesiredWeatherData(data) {
    this.humidity = data.query.results.channel.atmosphere.humidity;
    this.temperature = data.query.results.channel.item.condition.temp;
  }
}
