import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { htmlAstToRender3Ast } from '@angular/compiler/src/render3/r3_template_transform';

@Injectable({
  providedIn: 'root'
})
export class WeatherApiService {
  private baseURL = 'https://weather-ydn-yql.media.yahoo.com/forecastrss?w=';
  private woeidMainUrl = `https://query.yahooapis.com/v1/public/yql?q=select`;
  private woeidURL: string;
  private woeidNumber: string;
  private woeidObject;

  constructor(private http: HttpClient) { }

  makeWoeidURL(city: string): void {
    const urlToEncode = ` * from geo.places where text="${city}"`;
    const cyqlURI = encodeURIComponent(urlToEncode);
    const urlWOEID = `${this.woeidMainUrl}${cyqlURI}&format=json`;
    this.woeidURL = urlWOEID;
  }

  findCityWoeid() {
    return this.http.get(this.woeidURL);
  }

  saveWoeidObject(woeidObj) {
    this.woeidObject = woeidObj;
    const numberWOEID = woeidObj['query']['results']['place'][0]['woeid'];
    this.woeidNumber = numberWOEID;
  }

  getForecastFromAPI() {
    return this.http.get(`${this.baseURL}${this.woeidNumber}&u=c`);
  }
}
