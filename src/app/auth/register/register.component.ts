import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
	constructor(private auth: AuthService, private fb: FormBuilder, private activatedRoute: ActivatedRoute) { }

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
		let companyId = this.activatedRoute.snapshot.params.companyId;
		let companyName = this.activatedRoute.snapshot.params.companyName;
		this.registerForm.controls['companyName'].setValue(companyName);
		this.registerForm.controls['companyName'].disable();
	}

	register() {
		this.auth.registerAccount(this.registerForm.value);
		// console.log(this.email, this.password, this.rePassword,this.fullName,this.companyName);
	}
}