import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DatabaseService } from 'src/app/shared/services/database.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  employeeCount:Number;
  constructor(private auth: AuthService,
		private db: DatabaseService) { }

  ngOnInit(): void {
    let companyId:string;
		let managerId:string;
		this.auth.getCurrentUser().then((user) => {
			companyId = user.manager.company.uid;
			managerId =user.manager.uid;
		})

		this.db.getEmployees(companyId, managerId).then((employees) => {
			this.employeeCount=employees.length;
		})
		
  }

}
