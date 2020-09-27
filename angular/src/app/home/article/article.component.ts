import { Component, OnInit, Input } from '@angular/core';
import * as marked from 'marked'

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  @Input() title: string;
  @Input() details: string;
  @Input() fullscreen: boolean = false;
  messageShown: string;

  constructor() { }

  ngOnInit(): void {
    this.messageShown = marked(this.details.split('\\n').join('\n'));
  }

}
