import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { MaterialModule } from './shared/material/material.module';
import { UserComponent } from './user/user.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UserService } from './services/user.service';
import { UserApiService } from './services/user-api.service';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    AddUserComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [UserService, UserApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
