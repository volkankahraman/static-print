import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	constructor(public auth: AngularFireAuth, private router: Router) {
		this.auth.onAuthStateChanged((user) => {
			if (user) {
				this.router.navigate([ '/dashboard' ]);
			} else {
				this.router.navigate([ '/login' ]);
			}
		});
	}
	checkIfLogin() {
		return this.auth.currentUser;
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
