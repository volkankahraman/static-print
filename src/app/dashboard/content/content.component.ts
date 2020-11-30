import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DatabaseService } from 'src/app/shared/services/database.service';

@Component({
	selector: 'app-content',
	templateUrl: './content.component.html',
	styleUrls: [ './content.component.css' ]
})
export class ContentComponent implements OnInit {
	employeeCount: Number = 0;
	showEmployeeCount: boolean = false;

	companyCount: Number = 0;
	showCompanyCount: boolean = false;

	documentCount: Number = 0;
	showDocumentCount: boolean = false;

	role: string = '';
	displayName: string = '';

	constructor(private auth: AuthService, private db: DatabaseService) {}

	ngOnInit(): void {
		let companyId: string;
		let managerId: string;
		this.auth.getCurrentUser().then((user) => {
			if (user.isAdmin) {
				companyId = user.admin.company.uid;
				managerId = user.admin.uid;
				this.showCompanyCount = true;
				this.role = 'Admin';
				this.displayName = user.admin.displayName;
				this.db.getCompanies().then((companies) => {
					this.companyCount = companies.length - 1;
				});
			} else if (user.manager) {
				companyId = user.manager.company.uid;
				managerId = user.manager.uid;
				this.showEmployeeCount = true;
				this.showDocumentCount = true;
				this.role = 'Yönetici';
				this.displayName = user.manager.displayName;
				this.db.getEmployees(companyId, managerId).then((employees) => {
					this.employeeCount = employees.length;
				});
				this.db.getCompanyDocs(companyId).then((documents) => {
					documents.subscribe((documentsInstance) => {
						this.documentCount = documentsInstance.length;
					});
				});
			} else if (user.employee) {
				this.showDocumentCount = true;
				this.role = 'Çalışan';
				this.displayName = user.employee.displayName;
				this.db.getUserDocs(user.employee.uid).then(async (documents) => {
					this.documentCount = documents.length;
				});
			}
		});
	}
}
