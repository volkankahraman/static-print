import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
	constructor(
		private auth: AuthService,
		private fb: FormBuilder,
		private activatedRoute: ActivatedRoute,
		private router: Router
	) {}

	registerForm = this.fb.group({
		email: [],
		fullName: [],
		companyName: [],
		password: [],
		rePassword: []
	});

	title: string;
	companyId: string;

	ngOnInit(): void {
		this.title = environment.title;
		this.companyId = this.activatedRoute.snapshot.params.companyId;
		let companyName = this.activatedRoute.snapshot.params.companyName;
		let fullName = this.activatedRoute.snapshot.params.fullName;
		let email = this.activatedRoute.snapshot.params.email;

		if (this.companyId != undefined) {
			this.registerForm.controls['companyName'].setValue(companyName);
			this.registerForm.controls['companyName'].disable();
			this.registerForm.controls['fullName'].setValue(fullName);
			this.registerForm.controls['fullName'].disable();
			this.registerForm.controls['email'].setValue(email);
			this.registerForm.controls['email'].disable();
		}
	}

	async register() {
		if (this.companyId != undefined) {
			await this.auth.registerAccount(this.registerForm.getRawValue(), this.companyId);
		} else {
			await this.auth.registerAccount(this.registerForm.getRawValue());
		}

		let isUser: boolean;
		this.auth.currUser.subscribe((authState) => {
			isUser = !!authState;
			if (isUser) {
				this.router.navigate([ '/dashboard' ]);
			}
		});
	}
}
