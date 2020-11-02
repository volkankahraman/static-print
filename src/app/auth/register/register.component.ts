import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: [ './register.component.css' ]
})
export class RegisterComponent implements OnInit {
	title: string;
	email: string;
	password: string;
	rePassword: string;

	constructor() {}

	ngOnInit(): void {
		this.title = environment.title;
	}

	register() {
		console.log(this.email, this.password, this.rePassword);
	}
}
