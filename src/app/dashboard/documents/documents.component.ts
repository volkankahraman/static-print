import { Component, OnDestroy, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as printJS from 'print-js';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DatabaseService } from 'src/app/shared/services/database.service';

@Component({
	selector: 'app-documents',
	templateUrl: './documents.component.html',
	styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnDestroy, OnInit {
	dtOptions: DataTables.Settings = {};
	dtTrigger = new Subject();

	documents: any;
	filterText = '';

	showNavigation: boolean = true;

	constructor(private auth: AuthService, private db: DatabaseService, private router: Router) { }
	@Input() isPrinted: boolean;

	ngOnInit(): void {
		this.dtOptions = {
			pagingType: 'full_numbers',
			pageLength: 5,
			language:{
				url:'//cdn.datatables.net/plug-ins/1.10.22/i18n/Turkish.json'
			}
		};
		this.auth.getCurrentUser().then((user) => {
			if (user.manager) {
				let companyId: string = user.manager.company.uid;

				this.db.getCompanyDocs(companyId).then((documents) => {
					documents.subscribe(async (documentsInstance) => {
						let companyDocList = [];
						for (const doc of documentsInstance) {
							if (doc.companyId == companyId) {
								let docUser = await this.db.getUserFromId(doc.userId);

								companyDocList.push({
									...doc,
									user: docUser
								});
							}
						}
						this.documents = companyDocList;
						this.dtTrigger.next();
					});
				});
			} else if (user.employee) {
				let userId: string = user.employee.uid;

				this.db.getUserDocs(userId).then((documents) => {
					this.documents = documents;
				});
			} else if (user.pMaster) {
				let companyId: string = user.pMaster.company.uid;
				this.showNavigation = false;

				this.db.getCompanyDocs(companyId).then((documents) => {
					documents.subscribe(async (documentsInstance) => {
						let companyDocList = [];
						for (const doc of documentsInstance) {
							if (doc.companyId == companyId) {
								let docUser = await this.db.getUserFromId(doc.userId);
								if (this.isPrinted) {
									if (doc.isPrinted) {
										companyDocList.push({
											...doc,
											user: docUser
										});
									}
								} else {
									if (doc.isPrinted == null || doc.isPrinted == false) {
										companyDocList.push({
											...doc,
											user: docUser
										});

										printJS(doc.downloadUrl);

										setTimeout(() => {
											this.db.setPrinted(doc.eventId).then((_) => { });
										}, 5000);
									}
								}
							}
						}

						this.documents = companyDocList;
					});
				});
			} else this.router.navigate(['/dashboard']);
		});
	}

	ngOnDestroy(): void {
		this.dtTrigger.unsubscribe();
	}
}
