import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';
import { TimelineComponent } from './timeline/timeline.component';
import { ArticleComponent } from './article/article.component'
import { HomeFacade } from './home.facade'
import { StoreModule } from '@ngrx/store';
import { featureKey, reducer } from './store/reducers'

@NgModule({
  declarations: [
    HomeComponent,
    TimelineComponent,
    ArticleComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forFeature(featureKey, reducer)
  ],
  providers: [HomeFacade],
  bootstrap: [HomeComponent]
})
export class HomeModule { }
