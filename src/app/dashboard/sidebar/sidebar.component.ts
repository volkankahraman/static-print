import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit {
  companyName: string;
  showAdminOperations: boolean = false;
  showManagementOperations: boolean = false;
  showDocumentOperations: boolean = false;

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.auth.getCurrentUser().then((user) => {
      if (user.admin) {
        this.companyName = user.admin.company.name;
        this.showAdminOperations = true;
      } else if (user.manager) {
        this.companyName = user.manager.company.name;
        this.showManagementOperations = true;
        this.showDocumentOperations = true;
      } else if (user.employee) {
        this.companyName = user.employee.company.name;
        this.showDocumentOperations = true;
      }
    });
  }
}