import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { DatabaseService } from './database.service';
import { Manager } from '../models/manager';
import { Company } from '../models/company';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currUser: Observable<firebase.User>;
  // db:Function;

  getUser(): Observable<firebase.User> {
    return this.auth.authState;
  }
  constructor(public auth: AngularFireAuth,private db:DatabaseService ) {}
  async checkIfLogin() {
    return await this.auth.currentUser;
  }
  loginWithEmail(email: string, password: string) {
    this.auth
      .signInWithEmailAndPassword(email, password)
      .then((res) => console.log(res));
  }
  registerAccount(email: string, password: string,fullName: string, companyName: string) {
    this.auth.createUserWithEmailAndPassword(email, password).then((res) => {
      if (res.user) {
        let newManager: Manager = new Manager( 
          res.user.uid,
          res.user.email,
          res.user.email.split('@')[0],
          fullName,
          );
          let newCompany: Company = new Company(companyName);
          

        this.db.addManager(newManager,newCompany);
      }
    });
  }

  logout() {
    this.auth.signOut();
  }
}
