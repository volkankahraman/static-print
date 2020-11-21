import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';

import { Admin } from '../models/admin';
import { Company } from '../models/company';
import { Employee } from '../models/employee';
import { Manager } from '../models/manager';
import { Upload } from '../models/upload';
import { User } from '../models/user';
import { StorageService } from './storage.service';

@Injectable({
	providedIn: 'root'
})
export class DatabaseService {
	constructor(public db: AngularFirestore, public cf: AngularFireFunctions, private st: StorageService) {}

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
		let userType = (await userInstance.role.get()).data();
		if (userType.type == 'admin') {
			let admin = new Admin(uid, userInstance.email, userInstance.username, userInstance.displayName);
			let companyInstance = await this.db.collection('companies').doc(userInstance.company).ref.get();
			let company = new Company(companyInstance.data().name);
			company.uid = companyInstance.id;

			admin.addCompany(company);

			return { admin, isAdmin: true };
		} else if (userType.type == 'manager') {
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

	async addDocument(document: Upload, user: { employee?: Employee; manager?: Manager }) {
		let userId: string, companyId: string, url: string;

		if (user.employee) {
			userId = user.employee.uid;
			companyId = user.employee.company.uid;
			url = user.employee.company.name + '/' + document.name;
		} else if (user.manager) {
			userId = user.manager.uid;
			companyId = user.manager.company.uid;
			url = user.manager.company.name + '/' + document.name;
		}

		return this.st.uploadFile(document, url).then(async (res) => {
			let downloadUrl = await res.ref.getDownloadURL();

			return this.db
				.collection('documents')
				.add({
					...document.getInstance(),
					downloadUrl,
					userId,
					companyId,
					url
				})
				.then((res) => {
					return res.get();
				})
				.catch((e) => console.error(e));
		});
	}

	async getEmployees(companyId: string, managerId: string) {
		let employeeList = [];
		let employees = (await this.db.collection('users').ref.get()).docs;
		employees.forEach((employee) => {
			if (employee.data().company == companyId && employee.id != managerId) {
				employeeList.push(employee.data());
			}
		});
		return employeeList;
	}

	async getCompanies() {
		let companiesList = [];
		let employees = (await this.db.collection('companies').ref.get()).docs;
		employees.forEach((employee) => {
			companiesList.push(employee.data());
		});
		return companiesList;
	}
	async getCompanyDocs(companyId: string) {
		let companyDocList = [];
		let docs = (await this.db.collection('documents').ref.get()).docs;
		docs.forEach((doc) => {
			if (doc.data().companyId == companyId) companyDocList.push(doc.data());
		});
		return companyDocList;
	}

	async getUserDocs(userId: string) {
		let userDocList = [];
		let docs = (await this.db.collection('documents').ref.get()).docs;
		docs.forEach((doc) => {
			if (doc.data().userId == userId) userDocList.push(doc.data());
		});
		return userDocList;
	}
}
