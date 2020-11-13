import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Company } from '../models/company';
import { Manager } from '../models/manager';
import { User } from '../models/user';
import { AuthService } from './auth.service';

@Injectable({
	providedIn: 'root'
})
export class DatabaseService {
	constructor(public db: AngularFirestore) {}

	async addManager(manager: Manager, company: Company) {
		let companyInstance = await this.db.collection('companies').add(company.getInstance());
		company.uid = companyInstance.id;
		manager.company = company;
		await this.db.collection('users').doc(manager.uid).set({ ...manager.getInstance(), company: company.uid });

		return manager;
	}

	async getManagerData(uid: string) {
		let managerInstance = (await this.db.collection('users').doc(uid).ref.get()).data();
		let manager = new Manager(uid, managerInstance.email, managerInstance.username, managerInstance.displayName);
		let companyInstance = await this.db.collection('companies').doc(managerInstance.company).ref.get();
		let company = new Company(companyInstance.data().name);
		company.uid = companyInstance.id;

		manager.addCompany(company);

		return manager;
	}
}
