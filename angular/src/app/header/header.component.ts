import { Component, HostListener, OnDestroy } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import * as CONSTANT from '../constant'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnDestroy {
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if (window.pageYOffset == 0) {
      this.path = []
      for (let i in CONSTANT.PATHS)
        this.path.push(CONSTANT.PATHS[i])
      this.isSubpath = false
    }
    else {
      this.path = CONSTANT.SUB_PATHS[this.currentPath]
      this.isSubpath = true
    }
  }

  path: any[] = [];
  currentPath: string;
  isSubpath: boolean = false;
  subscription: any[] = [];

  constructor(private router: Router) {
    this.subscription.push(router.events.subscribe(event => {
      if (event instanceof NavigationStart) this.currentPath = event.url;
    }))
    for (let i in CONSTANT.PATHS)
      this.path.push(CONSTANT.PATHS[i])
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

  ngOnDestroy() {
    for (let i in this.subscription)
      this.subscription[i].unsubscribe()
  }
}
