import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'azwraith';
  backgroundImage: string = "assets/images/bg.jpg"
  @ViewChild('timeline') element: ElementRef;

  onRouterOutletActivate(event: any) {
    console.log(event)
  }
}
