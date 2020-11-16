import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FormBuilder } from '@angular/forms';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
	constructor(private auth: AuthService, private fb: FormBuilder) { }

	registerForm = this.fb.group({
		email: [],
		fullName: [],
		companyName: [],
		password: [],
		rePassword: []
	});

	title: string;

	ngOnInit(): void {
		this.title = environment.title;
	}

	register() {
		this.auth.registerAccount(this.registerForm.value);
		// console.log(this.email, this.password, this.rePassword,this.fullName,this.companyName);
	}
}
