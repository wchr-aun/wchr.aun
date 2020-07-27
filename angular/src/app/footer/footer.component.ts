import { Component, OnInit } from '@angular/core';
import * as CONSTANT from '../constant'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  paths: any[] = [];

  constructor() {
    for (let i in CONSTANT.PATHS)
      this.paths.push(CONSTANT.PATHS[i])
  }

  ngOnInit(): void {
  }

}
