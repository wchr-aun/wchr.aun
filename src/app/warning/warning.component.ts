import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-warning',
  templateUrl: './warning.component.html',
  styleUrls: ['./warning.component.css']
})
export class WarningComponent {
  closed: boolean = false;

  constructor() {
    if (screen.width > 1023) this.closed = true
  }

  close() {
    this.closed = true;
  }

}
