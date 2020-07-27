import { Component, OnInit, HostListener } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if (window.pageYOffset == 0) this.shownPath = 'default'
    else this.shownPath = this.currentPath
  }

  path: {} = {
    '/': [
      {name: 'Welcome', id: '#welcome'}, 
      {name: 'About me', id: '#aboutme'}, 
      {name: 'Timeline', id: '#timeline'}, 
      {name: 'Accomplishments', id: '#accomplishments'}, 
      {name: 'Contact', id: '#contact'}],
    'default': [{name: 'Home'}]
  };
  currentPath: string;
  shownPath: string = 'default';

  constructor(private router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.currentPath = event.url.split('#')[0]
      }
    })
  }

  ngOnInit(): void {
  }

  onActivate() {
    let scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, pos - pos/8);
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 16);
  }

}
