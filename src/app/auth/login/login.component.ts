import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
	constructor(private auth: AuthService) { }
	title: string;
	email: string;
	password: string;

	ngOnInit(): void {
		this.title = environment.title;
	}

	login() {
		this.auth.loginWithEmail(this.email, this.password);
		//console.log(this.email, this.password);
	}
}
