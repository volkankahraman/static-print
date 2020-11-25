import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { DatabaseService } from 'src/app/shared/services/database.service';
import { Upload } from 'src/app/shared/models/upload';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: [ './header.component.css' ]
})

export class HeaderComponent implements OnInit {
	constructor(
		private auth: AuthService,
		private notify: NotificationService,
		private db: DatabaseService,
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
			console.log("sa");
			
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

	async handleFileInput(file: File) {
		let user = await this.auth.getCurrentUser();
		let upload: Upload = new Upload(file);

		this.db
			.addDocument(upload, user)
			.then(async (res) => {
				console.log(res.data());
				this.notify.success('Belge Başarıyla Kaydedildi.');
			})
			.catch((e) => {
				console.error(e)
			this.notify.error("Belge Yüklenemedi.")	
			}
				);
	}
}
