import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { DatabaseService } from 'src/app/shared/services/database.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: [ './header.component.css' ]
})
export class HeaderComponent implements OnInit {
	@Input() user: any;

	constructor(
		private auth: AuthService,
		private notify: NotificationService,
		private db: DatabaseService,
		private router: Router
	) {}

	templateParams: any;
	isModalActive: string = '';
	mailAdress: string = '';
	mailName: string = '';
	senderMail: string = '';
	companyName: string = '';
	showAddEmployee: boolean = false;
	showAddDocument: boolean = false;
	showDocuments: boolean = false;

	showModal: boolean = false;
	sendInviteEmployee() {
		this.showModal = true;
	}

	ngOnInit(): void {
		this.auth.getCurrentUser().then((user) => {
			if (user.admin) {
				//codes
			} else if (user.manager) {
				this.companyName = user.manager.company.name;
				this.showAddEmployee = true;
				this.showAddDocument = true;
			} else if (user.employee) {
				this.showAddDocument = true;
			}
		});
	}

	logout() {
		this.auth.logout();
	}

	sentInviteEmployee(state) {
		if (state) {
			this.showModal = !state;
			this.notify.success('Çalışan Davet Edildi.');
		} else this.showModal = state;
	}
}
