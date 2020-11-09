import { Company } from './company';
import { User } from './user'

export class Manager extends User{
    company:Company;

    addCompany(company:Company){
        this.company = company;
    };
}