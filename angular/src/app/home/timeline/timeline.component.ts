import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  timeline: {} = {
    1997: [{month: 'October', text: 'Born on 1997 in Bangkok, Thailand'}],
    2004: [{month: 'May', text: 'Attended at Saint Gabriel\'s College, Bangkok, Thailand'}],
    2013: [{month: 'August', text: 'Attended to Eric Hamber Secondary School, Vancouver, BC, Canada, as an exchange student'}],
    2016: [
      {month: 'May', text: 'Graduated from Saint Gabriel\'s College'}, 
      {month: 'July', text: 'Attended at King Mongkut’s University of Technology Thonburi in Computer Engineering'}
    ],
    2017: [{month: 'November', text: 'Second runner up in Thailand Open Hackathon 2017'}],
    2018: [{month: 'June-July', text: 'Part-time as a PHP developer at Extosoft Co. Ltd.'}],
    2019: [{month: 'June-August', text: 'Interned as a research assistant at Nanyang Technological University, Singapore'}],
    2020: [
      {month: 'February', text: 'Received supporting fund in the semi final round of NSC2020'},
      {month: 'June', text: 'Second runner up in Best Senior Project 2019'},
      {month: 'July', text: 'Submitted "The Relations Between Implementation Date of Policies and The Spreading of COVID-19" to BGDi'},
      {month: 'July', text: 'Started working as a software engineer at Kasikorn Business-Technology Group'}
    ]
  }
  years: number[] = [1997, 2004, 2013, 2016, 2017, 2018, 2019, 2020]
  
  constructor() { }

  ngOnInit(): void {
  }

}
