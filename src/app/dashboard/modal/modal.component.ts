import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ValidationService } from 'src/app/shared/services/validation.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import emailjs, { EmailJSResponseStatus, send } from 'emailjs-com';
import { DatabaseService } from 'src/app/shared/services/database.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Upload } from 'src/app/shared/models/upload';

@Component({
	selector: 'app-modal',
	templateUrl: './modal.component.html',
	styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
	@Input() state: boolean = false;
	@Input() header: boolean = false;
	@Input() form: number;

	@Output() onClose = new EventEmitter();

	constructor(
		private notify: NotificationService,
		private auth: AuthService,
		private valid: ValidationService,
		private db: DatabaseService,
		private fb: FormBuilder
	) { }

	mailAddress: string;
	mailName: string;
	nMailName: string;
	cid: string;
	cName: string;

	ID: string;

	ngOnInit(): void {
		this.auth.getCurrentUser().then((user) => {
			if (user.manager) {
				this.cid = user.manager.company.uid;
				this.cName = user.manager.company.name;
				this.ID = user.manager.uid
			} else if (user.employee) {
				this.ID = user.employee.uid
			}
		});
	}

	close() {
		this.onClose.emit(this.state);
	}

	inviteEmployee = this.fb.group({
		fullName: [],
		email: []
	});

	sendMail(form: FormGroup, sendType: number) {
		if (form.value.email && form.value.fullName) {
			if (this.valid.checkEmail(form.value.email)) {
				if (this.valid.checkFullName(form.value.fullName)) {
					let fullName = form.value.fullName.replace(' ', '%20');
					let companyName = this.cName.replace(' ', '%20');
					let templateParams;
					if (sendType == 1) {
						templateParams = {
							from_name: this.cName,
							to_name: form.value.fullName,
							to_email: form.value.email,
							message: `https://static-print.web.app/auth/register/${this
								.cid}/${companyName}/${fullName}/${form.value.email}`,
							username: '',
							password: ''
						};
					} else if (sendType == 2) {
						templateParams = {
							from_name: this.cName,
							to_name: form.value.fullName,
							to_email: form.value.email,
							message: `https://static-print.web.app/auth/login`,
							username: `Kullanıcı Adı: ${form.value.email}`,
							password: `Şifre: ${form.value.password}`
						};
					}
					emailjs
						.send('service_plbvjsa', 'template_wb9aoxv', templateParams, 'user_ap9e5pxx5z5g6LVeEWBC5')
						.then((result: EmailJSResponseStatus) => {
							console.log(result.text);
						})
						.catch((error) => {
							console.log(error.text);
						});
					if (sendType == 1) this.notify.success('Personel Davet Edildi.');
					else if (sendType == 2) this.notify.success('Yazıcı Hesabı Eklendi ve Mail Gönderildi.');
					this.onClose.emit(!this.state);
				} else this.notify.warning('Ad Soyad Sadece Harflerden Oluşmalıdır.');
			} else this.notify.warning('Geçerli Bir Email Adresi Giriniz.');
		} else this.notify.warning('Tüm Alanlar Doldurulmalıdır.');
	}

	printerAccount = this.fb.group({
		fullName: [],
		email: [],
		password: []
	});

	async addPrinterAccount() {
		this.db.addPMaster(this.printerAccount.getRawValue(), this.cid).then(() => {
			this.sendMail(this.printerAccount, 2);
			this.onClose.emit(!this.state);
		});
		// await this.auth.registerAccount(this.printerAccount.getRawValue(), this.cid).then(() => {
		// });
	}

	files: File[] = [];
	fileForm = this.fb.group({
		fileName: []
	});

	onSelect(event) {
		this.files.push(...event.addedFiles);
	}

	onRemove(event) {
		this.files.splice(this.files.indexOf(event), 1);
	}

	async uploadFile(file: File[]) {
		let user = await this.auth.getCurrentUser();
		if (file.length > 0) {
			let upload: Upload = new Upload(file[0]);
			this.db
				.addDocument(upload, user)
				.then(async (res) => {
					this.notify.success('Belge Başarıyla Kaydedildi.');
					this.onClose.emit(!this.state);
				})
				.catch((e) => {
					this.notify.error('Belge Yüklenemedi.');
				});
		}
	}

	editAccount = this.fb.group({
		fullName: []
	});

	updateAccount() {
		this.db
			.changeUserDisplayName(this.ID, this.editAccount.value.fullName)
			.then((user) => {
				console.log(user);
				this.notify.success('Kullanıcı Adı Değiştirildi.');
				this.onClose.emit(!this.state);
				location.reload();
			})
			.catch((err) => console.log('Kullanıcı bulunamadı'));
	}
}
