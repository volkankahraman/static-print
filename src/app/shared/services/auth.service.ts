import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, Subject } from 'rxjs';
import { DatabaseService } from './database.service';
import { Manager } from '../models/manager';
import { Company } from '../models/company';
import { NotificationService } from './notification.service';
import { ValidationService } from './validation.service';
import { error } from '@angular/compiler/src/util';
import { User } from '../models/user';
import { stringify } from 'querystring';
import { Router } from '@angular/router';
import { async } from '@angular/core/testing';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	currUser = new Subject<User>();

	getUser(): Observable<firebase.User> {
		return this.auth.authState;
	}

	constructor(
		public auth: AngularFireAuth,
		private db: DatabaseService,
		private notify: NotificationService,
		private valid: ValidationService,
		private router: Router
	) {}

	async getCurrentUser() {
		let authUser = await this.auth.currentUser;
		let userClaims = await authUser.getIdTokenResult();

		return this.db.getUserData(authUser.uid, userClaims.claims.admin || false);
	}

	loginWithEmail(user: { email: string; password: string }) {
		this.auth
			.signInWithEmailAndPassword(user.email, user.password)
			.then(async (res) => {
				if (res.user) {
					this.getCurrentUser();
				}
			})
			.catch((error) => {
				//console.error(error);
				if (error.code == 'auth/argument-error') this.notify.warning('Tüm Alanlar Doldurulmalıdır.');
				else if (error.code == 'auth/invalid-email') this.notify.error('Geçerli Email Adresi Giriniz.');
				else if (error.code == 'auth/user-not-found') this.notify.error('Kullanıcı Bulunmadı');
				else if (error.code == 'auth/wrong-password') this.notify.error('Hatalı Şifre');
			});
	}

	async registerAccount(
		user: { email: string; password: string; rePassword: string; fullName: string; companyName: string },
		companyId?: string
	) {
		if (user.password == user.rePassword) {
			if (this.valid.checkFullName(user.fullName))
				this.auth
					.createUserWithEmailAndPassword(user.email, user.password)
					.then(async (res) => {
						if (res.user) {
							// Manager signing
							if (companyId == undefined) {
								this.db.addManager(res.user, user.fullName, user.companyName).then((manager) => {
									this.currUser.next(manager);
								});
							} else {
								// Employee signing
								await this.db.addEmployee(res.user, user.fullName, companyId).then((employee) => {
									this.currUser.next(employee);
								});
							}
						}
					})
					.catch((error) => {
						console.error(error);
						if (error.code == 'auth/argument-error') this.notify.warning('Tüm Alanlar Doldurulmalıdır.');
						else if (error.code == 'auth/email-already-in-use')
							this.notify.warning('Email Adresi Başka Bir Şirket Tarafından Kullanılmaktadır.');
						else if (error.code == 'auth/invalid-email') this.notify.error('Geçerli Email Adresi Giriniz.');
						else if (error.code == 'auth/weak-password')
							this.notify.error('Şifre En Az 6 Haneli Olmalıdır.');
					});
			else this.notify.warning('Ad Soyad Sadece Harflerden Oluşmalıdır.');
		} else this.notify.warning('Şifreler Uyuşmamaktadır.');
	}

	async logout() {
		await this.auth.signOut();
		this.router.navigate([ '/auth', 'login' ]);
	}
	async sendPasswordResetEmail(	user: { email: string; }){
		this.auth.sendPasswordResetEmail(user.email)
		.then( resp =>  this.notify.success('Gönderildi!') )
		.then( resp => this.router.navigate([ '/auth', 'login' ]))
		.catch((error) => {
			console.error(error.code);
			if (error.code == 'auth/argument-error') this.notify.warning('Tüm Alanlar Doldurulmalıdır.');
			else if (error.code == 'auth/invalid-email') this.notify.error('Geçerli Email Adresi Giriniz.');
			else if (error.code == 'auth/user-not-found') this.notify.error('Girdiğiniz Kullanıcı Sistemde Bulunamadı veya Silinmiş Olabilir.');
		});
	}
}
