import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
	constructor(
		private auth: AuthService
	) { }

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
	formType: number;
	header: string;

	sendModalState(formType: number, header: string) {
		this.formType = formType
		this.header = header
		this.showModal = true;
	}

	updateModalState(state) {
		if (state) {
			this.showModal = !state;
		} else this.showModal = state;
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
}