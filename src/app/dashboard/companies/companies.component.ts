import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DatabaseService } from 'src/app/shared/services/database.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})

export class CompaniesComponent implements OnInit {
  companies;

  constructor(private auth: AuthService, private db: DatabaseService, private router: Router) { }

  ngOnInit(): void {
    this.auth.getCurrentUser().then((user) => {
      if (user.admin) {
        this.db.getCompanies().then((companies) => {
          this.companies = companies;
        })
      }
      else this.router.navigate(['/dashboard'])
    })
  }
}