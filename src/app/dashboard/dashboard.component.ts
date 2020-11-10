import { Component, OnInit } from '@angular/core';
//import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css', './header/header.component.css', './sidebar/sidebar.component.css', './content/content.component.css']
  //encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
}