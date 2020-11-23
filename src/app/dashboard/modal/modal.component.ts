import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ValidationService } from 'src/app/shared/services/validation.service';
import { DatabaseService } from 'src/app/shared/services/database.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { Company } from 'src/app/shared/models/company';

@Component({
	selector: 'app-modal',
	templateUrl: './modal.component.html',
	styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
	@Input() sentState: boolean = false;

	@Output() onClose = new EventEmitter();

	constructor(
		private notify: NotificationService,
		private db: DatabaseService,
		private auth: AuthService,
		private valid: ValidationService
	) { }

	mailAddress: string;
	mailName: string;
	nMailName: string;
	uid: string;
	cName: string;
	ngOnInit(): void {
		this.auth.getCurrentUser().then((user) => {
			if (user.manager) {
				this.uid = user.manager.company.uid;
				this.cName = user.manager.company.name;
			}
		});
	}

	sendMail() {
		this.nMailName = this.mailName.replace(' ', '%20');
		this.cName = this.cName.replace(' ', '%20');
		if (this.mailAddress && this.mailName) {
			if (this.valid.checkEmail(this.mailAddress)) {
				if (this.valid.checkFullName(this.mailName)) {
					var templateParams = {
						from_name: this.cName,
						to_name: this.mailName,
						to_email: this.mailAddress,
						message: `https://static-print.web.app/auth/register/${this.uid}/${this.cName}/${this
							.nMailName}/${this.mailAddress}`
					};
					emailjs
						.send('service_plbvjsa', 'template_wb9aoxv', templateParams, 'user_ap9e5pxx5z5g6LVeEWBC5')
						.then((result: EmailJSResponseStatus) => {
							console.log(result.text);
						})
						.catch((error) => {
							console.log(error.text);
						});
					this.onClose.emit(!this.sentState);
				} else this.notify.warning('Ad Soyad Sadece Harflerden Oluşmalıdır.');
			} else this.notify.warning('Geçerli Bir Email Adresi Giriniz.');
		} else this.notify.warning('Tüm Alanlar Doldurulmalıdır.');
	}

	close() {
		this.onClose.emit(this.sentState);
	}
}
