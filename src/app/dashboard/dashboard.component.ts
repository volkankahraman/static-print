import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: [
		'./dashboard.component.css',
		'./header/header.component.css',
		'./sidebar/sidebar.component.css',
		'./content/content.component.css'
	]
})

export class DashboardComponent implements OnInit {
	constructor() { }

	ngOnInit(): void {}
}