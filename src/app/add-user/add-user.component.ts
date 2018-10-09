import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  userForm: FormGroup;
  firstname: AbstractControl;
  surname: AbstractControl;
  country: AbstractControl;
  city: AbstractControl;
  gender: AbstractControl;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      firstname: ['', Validators.required],
      surname: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      gender: ['', Validators.required]
    });
    this.firstname = this.userForm.controls['firstname'];
    this.surname = this.userForm.controls['surname'];
    this.country = this.userForm.controls['country'];
    this.city = this.userForm.controls['city'];
    this.gender = this.userForm.controls['gender'];
  }

  addUser(form: NgForm) {

  }
}
