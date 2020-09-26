import { Component, OnInit } from '@angular/core';
import { HomeFacade } from './home.facade';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  title = 'azwraith';

  constructor (private homeFacade: HomeFacade) { }

  ngOnInit() {
  }
}
