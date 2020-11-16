import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ValidationService } from 'src/app/shared/services/validation.service';
import { DatabaseService } from 'src/app/shared/services/database.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: [ './header.component.css' ]
})
export class HeaderComponent implements OnInit {
	constructor(
		private auth: AuthService,
		private notify: NotificationService,
		private valid: ValidationService,
		private db: DatabaseService
	) {}
	templateParams: any;
	isModalActive: string = '';
	mailAdress: string = '';
	mailName: string = '';
	senderMail: string = '';
	companyName: string = '';

	showModal: boolean = false;
	sendInviteEmployee() {
		this.showModal = true;
		console.log(this.showModal);
	}

	ngOnInit(): void {
		this.auth.getCurrentUser().then((user) => {
			if (user.isAdmin) {
				console.log(user.userData);
				console.log('admin giriş yaptı');
			} else if (user.manager) {
				console.log(user.manager);
				this.db.getEmployees(user.manager.company.uid, user.manager.uid).then((employees) => {
					console.log(employees);
				});
				console.log('manager giriş yaptı');
				this.companyName = user.manager.company.name;
			} else if (user.employee) {
				console.log(user.employee);
				console.log('employee giriş yaptı');
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
