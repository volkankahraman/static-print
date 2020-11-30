import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';

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
	isPMaster: boolean = false;

	constructor(
		private auth: AuthService
	) { }

	ngOnInit(): void {
		this.auth.getCurrentUser().then((user) => {
			if (user.pMaster) this.isPMaster = true			
		})
	}
}