import { UserApiService } from './../services/user-api.service';
import { WeatherApiService } from './../services/weather-api.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../user/user';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  user: User;
  newUser: User;
  forecast;
  humidity: string;
  temperature: string;
  isEditable = false;

  updateUserForm: FormGroup;
  firstname: AbstractControl;
  surname: AbstractControl;
  country: AbstractControl;
  city: AbstractControl;
  gender: AbstractControl;

  constructor(
    private route: ActivatedRoute,
    private weatherS: WeatherApiService,
    private userApi: UserApiService,
    private fb: FormBuilder,
    private userS: UserService) { }

  ngOnInit() {
    this.getUserDataById();
  }

  getUserDataById() {
    const id = this.route.snapshot.params['id'];
    this.userApi.getUserById(+id)
    .subscribe(
      (user: User) => {
        this.user = user[0];
        this.getForecast();
        this.createUserForm();
      },
      () => console.log('Can not get user by id')
    );
  }

  getForecast() {
    this.weatherS.makeURLCityWeather(this.user['city']);
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

  updateUser() {
    const updatedUser = {...this.updateUserForm.value};
    this.userApi.editUser(updatedUser)
    .subscribe(
      () => {
        this.userS.updateUser(updatedUser);
        this.user = updatedUser;
        this.isEditable = false;
      },
      () => {
        console.log('Updating user failed');
      }
    );
    // const { firstname, surname, city, country, gender } = this.userForm.value;
    // const newUser = new User(firstname, surname, city, country, gender, this.user.id);
    // this.newUser = newUser;
  }

  createUserForm(): void {
    this.updateUserForm = this.fb.group({
      firstname: [this.user.firstname, Validators.required],
      surname: [this.user.surname, Validators.required],
      country: [this.user.country, Validators.required],
      city: [this.user.city, Validators.required],
      gender: [this.user.gender, Validators.required],
      id: this.user.id
    });
    this.firstname = this.updateUserForm.controls['firstname'];
    this.surname = this.updateUserForm.controls['surname'];
    this.country = this.updateUserForm.controls['country'];
    this.city = this.updateUserForm.controls['city'];
    this.gender = this.updateUserForm.controls['gender'];
  }
}
