import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
	constructor(private auth: AuthService) {}
	title: string;
	fullName: string;
	companyName: string;
	email: string;
	password: string;
	rePassword: string;

	ngOnInit(): void {
		this.title = environment.title;
	}

	register() {
		this.auth.registerAccount(this.email, this.password, this.fullName, this.companyName, 'MoUXILUULYXmeZL7MzhR');
		// console.log(this.email, this.password, this.rePassword,this.fullName,this.companyName);
	}
}
