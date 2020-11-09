import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Company } from '../models/company';
import { Manager } from '../models/manager';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(public db: AngularFirestore) {}

  async addManager(manager: Manager, company: Company) {
    console.log(manager.getInstance());
    let companyInstance = await this.db.collection('companies').add(company.getInstance());
    company.uid = companyInstance.id;

    await this.db
      .collection('users')
      .doc(manager.uid)
      .set({ ...manager.getInstance(), company: company.uid });
  }
}
