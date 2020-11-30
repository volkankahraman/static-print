import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DatabaseService } from 'src/app/shared/services/database.service';

@Component({
	selector: 'app-documents',
	templateUrl: './documents.component.html',
	styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
	documents;
	filterText = '';

	showNavigation: boolean = true;

	constructor(private auth: AuthService, private db: DatabaseService, private router: Router) { }

	ngOnInit(): void {
		this.auth.getCurrentUser().then((user) => {
			if (user.manager) {
				let companyId: string = user.manager.company.uid;

				this.db.getCompanyDocs(companyId).then((documents) => {
					documents.subscribe((documentsInstance) => {
						let companyDocList = [];
						for (const doc of documentsInstance) {
							if (doc.companyId == companyId) {
								let docUser = user.manager;
								companyDocList.push({
									...doc,
									user: docUser
								});
							}
						}
						this.documents = companyDocList;
					});
				});
			} else if (user.employee) {
				let userId: string = user.employee.uid;

				this.db.getUserDocs(userId).then((documents) => {
					this.documents = documents;
				});
			} else if (user.pMaster) {
				let companyId: string = user.pMaster.company.uid;
				this.showNavigation = false

				this.db.getCompanyDocs(companyId).then((documents) => {
					documents.subscribe((documentsInstance) => {
						let companyDocList = [];
						for (const doc of documentsInstance) {
							if (doc.companyId == companyId) {
								let docUser = user.manager;
								companyDocList.push({
									...doc,
									user: docUser
								});
							}
						}
						this.documents = companyDocList;
					});
				});
			}
			else this.router.navigate(['/dashboard']);
		});
	}
}
