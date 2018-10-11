import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class WeatherApiService {
  private weatherMainUrl = `https://query.yahooapis.com/v1/public/yql?q=`;
  private weatherURL: string;

  constructor(private http: HttpClient) { }

  getForecastFromAPI() {
    return this.http.get(this.weatherURL);
  }

  makeURLCityWeather(city) {
    const yqlString = `select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="${city}") and u='c'`;
    const encodedURI = encodeURIComponent(yqlString);
    const mainURL = `${this.weatherMainUrl}${encodedURI}&format=json&u=c`;
    this.weatherURL = mainURL;
  }
}
