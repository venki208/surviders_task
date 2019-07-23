import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';



import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { UserServiceService } from './user/user-service.service'





@NgModule({
  declarations: [
    AppComponent,
    UserComponent
  ],
  imports: [
    MatToolbarModule,
    MatTableModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    InfiniteScrollModule
  ],
  providers: [
    UserServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
