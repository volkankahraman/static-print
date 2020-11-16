import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { DatabaseService } from '../shared/services/database.service';
//import { ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: [
		'./dashboard.component.css',
		'./header/header.component.css',
		'./sidebar/sidebar.component.css',
		'./content/content.component.css'
	]
	//encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
	constructor(private auth: AuthService,
		private db: DatabaseService) {
		
	}

	 ngOnInit(): void {
	// 	let companyId:string;
	// 	this.auth.getCurrentUser().then((user) => {
	// 		companyId = user.manager.company.uid;
	// 	})

		// let employee = this.db.getEmployee(companyId)
		// console.log("here")
		// console.log(employee)
	}
}
