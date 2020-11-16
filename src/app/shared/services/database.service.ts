import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { auth } from 'firebase';
import { Company } from '../models/company';
import { Employee } from '../models/employee';
import { Manager } from '../models/manager';
import { User } from '../models/user';

@Injectable({
	providedIn: 'root'
})
export class DatabaseService {
	constructor(public db: AngularFirestore, public cf: AngularFireFunctions) {}

	async addManager(user: firebase.User, fullName: string, companyName: string) {
		let newManager: Manager = new Manager(user.uid, user.email, user.email.split('@')[0], fullName);
		let newCompany: Company = new Company(companyName);

		let companyInstance = await this.db.collection('companies').add(newCompany.getInstance());
		newCompany.uid = companyInstance.id;
		newManager.company = newCompany;
		await this.db
			.collection('users')
			.doc(newManager.uid)
			.set({ ...newManager.getInstance(), company: newCompany.uid });

		await this.cf.httpsCallable('addRole')({ type: 'manager', userId: newManager.uid }).toPromise();

		return newManager;
	}

	async addEmployee(user: firebase.User, fullName: string, companyId: string) {
		let newEmployee: Employee = new Employee(user.uid, user.email, user.email.split('@')[0], fullName);

		let invitedcompany = await this.db.collection('companies').doc(companyId).ref.get();
		let companyInstance = new Company(invitedcompany.data().name);

		companyInstance.uid = invitedcompany.id;

		newEmployee.company = companyInstance;

		await this.db
			.collection('users')
			.doc(newEmployee.uid)
			.set({ ...newEmployee.getInstance(), company: companyInstance.uid });

		await this.cf.httpsCallable('addRole')({ type: 'employee', userId: newEmployee.uid }).toPromise();

		return newEmployee;
	}

	async getUserData(uid: string, admin: Boolean) {
		let userInstance = (await this.db.collection('users').doc(uid).ref.get()).data();
		if (admin) {
			let userData = new User(uid, userInstance.email, userInstance.username, userInstance.displayName);
			return { userData, isAdmin: true };
		} else {
			let userType = (await userInstance.role.get()).data();
			if (userType.type == 'manager') {
				let manager = new Manager(uid, userInstance.email, userInstance.username, userInstance.displayName);
				let companyInstance = await this.db.collection('companies').doc(userInstance.company).ref.get();
				let company = new Company(companyInstance.data().name);
				company.uid = companyInstance.id;

				manager.addCompany(company);

				return { manager, isAdmin: false };
			} else if (userType.type == 'employee') {
				let employee = new Employee(uid, userInstance.email, userInstance.username, userInstance.displayName);
				let companyInstance = await this.db.collection('companies').doc(userInstance.company).ref.get();
				let company = new Company(companyInstance.data().name);
				company.uid = companyInstance.id;

				employee.addCompany(company);

				return { employee, isAdmin: false };
			}
		}
	}
}
