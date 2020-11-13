import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, Subject } from 'rxjs';
import { DatabaseService } from './database.service';
import { Manager } from '../models/manager';
import { Company } from '../models/company';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	currManager = new Subject<Manager>();

	getUser(): Observable<firebase.User> {
		return this.auth.authState;
	}
	constructor(public auth: AngularFireAuth, private db: DatabaseService) {}

	async getManager() {
		let uid: string = (await this.auth.currentUser).uid;
		return this.db.getManagerData(uid);
	}
	loginWithEmail(email: string, password: string) {
		this.auth.signInWithEmailAndPassword(email, password).then((res) => {
			if (res.user)
				this.db.getManagerData(res.user.uid).then((manager) => {
					this.currManager.next(manager);
				});
		});
	}
	registerAccount(email: string, password: string, fullName: string, companyName: string) {
		this.auth.createUserWithEmailAndPassword(email, password).then((res) => {
			if (res.user) {
				let newManager: Manager = new Manager(
					res.user.uid,
					res.user.email,
					res.user.email.split('@')[0],
					fullName
				);
				let newCompany: Company = new Company(companyName);

				this.db.addManager(newManager, newCompany).then((manager) => this.currManager.next(manager));
			}
		});
	}

	logout() {
		this.auth.signOut();
	}
}
