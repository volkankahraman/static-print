import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DatabaseService } from 'src/app/shared/services/database.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
	selector: 'app-printer-account',
	templateUrl: './printer-account.component.html',
	styleUrls: ['./printer-account.component.css']
})
export class PrinterAccountComponent implements OnInit {
	printerAccount;
	showModal: boolean = false;

	constructor(private auth: AuthService, private db: DatabaseService, private notify: NotificationService) { }

	addPrintAccount() {
		this.showModal = true;
	}

	addedPrinterAccount(state) {
		if (state) {
			this.showModal = !state;
			this.notify.success('Yazıcı Hesabı Eklendi ve Mail Gönderildi');
		} else this.showModal = state;
	}

	ngOnInit(): void {
		this.auth.getCurrentUser().then((user) => {
			if (user.manager) {
				let companyId: string = user.manager.company.uid;
				let managerId: string = user.manager.uid;

				this.db.getEmployees(companyId, managerId).then((employees) => {
					for (let employee in employees) {
						if (employees[employee]['userType'] == 'pMaster') {
							this.printerAccount = employees[employee];
							break;
						}
					}
				});
			}
		});
	}
	removePrinterAccount(paID) {
		this.notify.confirm("Yazıcıyı silmek istiyor musunuz?").then((result) => {
			if (result.isConfirmed) {
				this.notify.success("Yazıcı Silindi")
				this.db
					.removeUser(paID)
					.then((user) => {
						console.log(user)
						location.reload()
					})
					.catch((err) => console.log('Yazıcı Bulunamadı'));
			}
		})
	}
}
