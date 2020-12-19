import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(
    private auth: AuthService,
		private fb: FormBuilder,
		private router: Router
	) { }

	sendForm = this.fb.group({
		email: []
  });
  
  title: string;

	ngOnInit(): void {
		this.title = environment.title;
	}
  send(){
    this.auth.sendPasswordResetEmail(this.sendForm.value);
  };

}
