import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {
	constructor(private auth: AuthService, private fb: FormBuilder, private router: Router) {}

	loginForm = this.fb.group({
		email: [],
		password: []
	});

	title: string;

	ngOnInit(): void {
		this.title = environment.title;
	}

	login() {
		this.auth.loginWithEmail(this.loginForm.value);
		let isUser: boolean;
		this.auth.getUser().subscribe((authState) => {
			isUser = !!authState;
			if (isUser) {
				this.router.navigate([ '/dashboard' ]);
			}
		});
	}
}
