import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, Subject } from 'rxjs';
import { DatabaseService } from './database.service';
import { Manager } from '../models/manager';
import { Company } from '../models/company';
import { NotificationService } from './notification.service';
import { ValidationService } from './validation.service';
import { error } from '@angular/compiler/src/util';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	currManager = new Subject<Manager>();

	getUser(): Observable<firebase.User> {
		return this.auth.authState;
	}
	constructor(public auth: AngularFireAuth, private db: DatabaseService, private notify: NotificationService, private valid: ValidationService) { }

	async getManager() {
		let uid: string = (await this.auth.currentUser).uid;
		return this.db.getManagerData(uid);
	}

	loginWithEmail(user) {
		this.auth.signInWithEmailAndPassword(user.email, user.password).then((res) => {
			if (res.user)
				this.db.getManagerData(res.user.uid).then((manager) => {
					this.currManager.next(manager);
				});
		}).catch((error) => {
			//console.error(error);
			if (error.code == "auth/argument-error")
				this.notify.warning("Tüm Alanlar Doldurulmalıdır.")
			else if (error.code == "auth/invalid-email")
				this.notify.error("Geçerli Email Adresi Giriniz.")
			else if (error.code == "auth/user-not-found")
				this.notify.error("Kullanıcı Bulunmadı")
			else if (error.code == "auth/wrong-password")
				this.notify.error("Hatalı Şifre")
		});
	}

	registerAccount(user) {
		console.log(user)
		if (user.password == user.rePassword) {
			if (this.valid.checkFullName(user.fullName))
				this.auth.createUserWithEmailAndPassword(user.email, user.password).then((res) => {
					if (res.user) {
						let newManager: Manager = new Manager(
							res.user.uid,
							res.user.email,
							res.user.email.split('@')[0],
							user.fullName
						);
						let newCompany: Company = new Company(user.companyName);

						this.db.addManager(newManager, newCompany).then((manager) => {
							this.currManager.next(manager)
						});
					}
				}).catch((error) => {
					console.error(error);
					if (error.code == "auth/argument-error")
						this.notify.warning("Tüm Alanlar Doldurulmalıdır.")
					else if (error.code == "auth/email-already-in-use")
						this.notify.warning("Email Adresi Başka Bir Şirket Tarafından Kullanılmaktadır.")
					else if (error.code == "auth/invalid-email")
						this.notify.error("Geçerli Email Adresi Giriniz.")
					else if (error.code == "auth/weak-password")
						this.notify.error("Şifre En Az 6 Haneli Olmalıdır.")
				});
			else
				this.notify.warning("Ad Soyad Sadece Harflerden Oluşmalıdır.")
		}
		else
			this.notify.warning("Şifreler Uyuşmamaktadır.")
	}

	logout() {
		this.auth.signOut();
	}
}
