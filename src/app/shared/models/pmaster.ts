import { Company } from './company';
import { Role } from './role';
import { User } from './user'

export class Manager extends User {
    company: Company;
    role: Role;

    addCompany(company: Company) {
        this.company = company;
    };
}