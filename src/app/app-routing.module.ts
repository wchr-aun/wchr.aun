import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProjectsComponent } from './projects/projects.component'
import { RantsComponent } from './rants/rants.component'
import * as CONSTANT from '../assets/constant'

const routes: Routes = [
  { path: CONSTANT.PATHS.home.url, component: HomeComponent },
  // { path: CONSTANT.PATHS.projects.url, component: ProjectsComponent },
  // { path: CONSTANT.PATHS.rants.url, component: RantsComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
