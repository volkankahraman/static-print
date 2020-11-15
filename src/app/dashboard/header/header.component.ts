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

	ngOnInit(): void {
		this.auth.getManager().then((manager) => {
			console.log(manager.email)

			this.companyName = manager.company.name;
		})
	}

	sendMail() {
		if (this.mailAdress && this.mailName) {
			if (this.valid.checkEmail(this.mailAdress)) {
				if (this.valid.checkFullName(this.mailName)) {
					var templateParams = {
						from_name: this.companyName,
						to_name: this.mailName,
						to_email: this.mailAdress,
						message: this.companyName + "tarafından gönderilen linke tıklayın google.com"
					};

					console.log(templateParams)
					console.log(this.mailAdress)
					console.log(this.mailName)

					emailjs.send("service_plbvjsa", "template_wb9aoxv", templateParams, 'user_ap9e5pxx5z5g6LVeEWBC5')
						.then((result: EmailJSResponseStatus) => {
							console.log(result.text);
						}).catch((error) => {
							console.log(error.text);
						});
				}
				else
					this.notify.warning("Ad Soyad Sadece Harflerden Oluşmalıdır.")
			}
			else
				this.notify.warning("Geçerli Bir Email Adresi Giriniz.")
		}
		else
			this.notify.warning("Tüm Alanlar Doldurulmalıdır.")
	}

	logout() {
		this.auth.logout();
	}
}
