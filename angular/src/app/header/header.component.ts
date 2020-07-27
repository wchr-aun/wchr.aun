import { Component, HostListener } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if (window.pageYOffset == 0) this.shownPath = 'default'
    else this.shownPath = this.currentPath
  }

  path: {} = {
    '/': [
      {name: 'Welcome', id: 'welcome'}, 
      {name: 'About me', id: 'aboutme'}, 
      {name: 'Timeline', id: 'timeline'}, 
      {name: 'Accomplishments', id: 'accomplishments'}, 
      {name: 'Contact', id: 'contact'}],
    'default': [{name: 'Home', path: '/'}]
  };
  currentPath: string;
  shownPath: string = 'default';

  constructor(private router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) this.currentPath = event.url;
    })
  }

  scrollTo(elementId: string) {
    let target: number;
    let position: number = window.pageYOffset;
    let element;
    if (elementId === 'top') target = -position;
    else {
      element = document.getElementById(elementId);
      target = element ? element.getBoundingClientRect().top - 50 : 0;
    }
    window.scrollTo(0, position + target);
  }
}
