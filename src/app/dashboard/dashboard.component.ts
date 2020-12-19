import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { DatabaseService } from '../shared/services/database.service';

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

	constructor(private auth: AuthService, private db: DatabaseService) {}

	ngOnInit(): void {
		this.auth.getCurrentUser().then((user) => {
			if (user.pMaster) this.isPMaster = true;
		});

		// //Kullanıcı adı düzenleme örnek
		// this.db
		// 	.changeUserDisplayName('hcRX2eSc0lQcTbE9mt8SELuHo982', 'Ardanuc Akar')
		// 	.then((user) => console.log(user))
		//   .catch((err) => console.log('Kullanıcı bulunamadı'));

		// //İşten Çıkarma örnek
		//   this.db
		// 	.removeUser('hcRX2eSc0lQcTbE9mt8SELuHo982')
		// 	.then((user) => console.log(user))
		// 	.catch((err) => console.log('Kullanıcı bulunamadı'));
	}
}
