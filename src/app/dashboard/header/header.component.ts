import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ValidationService } from 'src/app/shared/services/validation.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
	constructor(private auth: AuthService, private notify: NotificationService, private valid: ValidationService) { }
	templateParams: any;
	isModalActive: string = '';
	mailAdress: string = "";
	mailName: string = "";
	senderMail: string = "";
	companyName: string = "";

	showModal: boolean = false;
	sendInviteEmployee() {
		this.showModal = true;
		console.log(this.showModal);
	}

	ngOnInit(): void {
		this.auth.getManager().then((manager) => {
			// console.log(manager.email)

			this.companyName = manager.company.name;
		})
	}

	logout() {
		this.auth.logout();
	}

	sentInviteEmployee(state) {
		if (state) {
			this.showModal = !state;
			this.notify.success("Çalışan Davet Edildi.");
		}
		else
			this.showModal = state;
	}
}
