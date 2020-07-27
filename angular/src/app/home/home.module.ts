import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { TimelineComponent } from './timeline/timeline.component';
import { AccomplishmentsComponent } from './accomplishments/accomplishments.component';
import { ContactComponent } from './contact/contact.component'

@NgModule({
  declarations: [
    HomeComponent,
    WelcomeComponent,
    TimelineComponent,
    AccomplishmentsComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [HomeComponent]
})
export class HomeModule { }
