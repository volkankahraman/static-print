import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	currUser: Observable<firebase.User>;
	getUser(): Observable<firebase.User> {
		return this.auth.authState;
	}
	constructor(public auth: AngularFireAuth) {}
	async checkIfLogin() {
		return await this.auth.currentUser;
	}
	loginWithEmail(email: string, password: string) {
		console.log(email, password);

		this.auth.signInWithEmailAndPassword(email, password).then((res) => console.log(res));
	}

	logout() {
		this.auth.signOut();
		console.log('signed out');
	}
}
