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

  constructor(private auth: AuthService, private db: DatabaseService, private router: Router) { }

  ngOnInit(): void {
    this.auth.getCurrentUser().then((user) => {
      if (user.manager) {
        let companyId: string = user.manager.company.uid;

        this.db.getCompanyDocsWithUser(companyId).then((documents) => {
          this.documents = documents;
          console.log(documents);
        });
      }
      else if (user.employee) {
        let userId: string = user.employee.uid;

        this.db.getUserDocsWithUser(userId).then((documents) => {
          this.documents = documents;
          console.log(documents);
        });
      }
      else this.router.navigate(['/dashboard']);
    })
  }
}