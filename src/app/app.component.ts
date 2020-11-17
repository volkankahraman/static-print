import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './shared/services/auth.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
	title = 'static-print';
	isUser = true;
	isDarkMode: boolean;

	constructor(private auth: AuthService, private router: Router) {}

	async ngOnInit() {
		this.isDarkMode = false;
		this.auth.getUser().subscribe((authState) => {
			this.isUser = !!authState;
			if (this.isUser) {
				setTimeout(() => {
					this.router.navigate([ '/dashboard' ]);
				}, 5000);
			}
		});
	}
}
