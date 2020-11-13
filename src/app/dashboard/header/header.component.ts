import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: [ './header.component.css' ]
})
export class HeaderComponent implements OnInit {
	constructor(private auth: AuthService) {}
	templateParams: any;
	isModalActive: string = '';
	mailAdress: string = "";
	mailName: string = "";
	senderMail: string="";
	companyName:string= "";
	

	ngOnInit(): void {
		this.auth.getManager().then((manager) =>{
			console.log(manager.email)

			this.companyName = manager.company.name;
		})
	}
	
	sendMail(){
		var templateParams = {
			from_name: this.companyName,
			to_name: this.mailName,
			to_email: this.mailAdress,
			message: this.companyName + "tarafından gönderilen linke tıklayın google.com"

		};
		console.log(templateParams)
		console.log(this.mailAdress)
		emailjs.send("service_plbvjsa","template_wb9aoxv", templateParams, 'user_ap9e5pxx5z5g6LVeEWBC5')
      .then((result: EmailJSResponseStatus) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
	}
	logout() {
		this.auth.logout();
	}
}
