import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
declare var particlesJS: any;

@Component({
	selector: 'app-auth',
	templateUrl: './auth.component.html',
	styleUrls: [ './auth.component.css' ]
})
export class AuthComponent implements OnInit {
	partJson: Object = environment.partJson;
	jsonUri = 'data:text/plain;base64,' + window.btoa(JSON.stringify(this.partJson));
	constructor() {}

	ngOnInit(): void {
		particlesJS.load('particles-js', this.jsonUri);
	}
}
