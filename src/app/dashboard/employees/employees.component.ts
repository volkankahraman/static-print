import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DatabaseService } from 'src/app/shared/services/database.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})

export class EmployeesComponent implements OnInit {
  employees;
  filterText = "";

  constructor(
    private auth: AuthService,
    private db: DatabaseService,
    private router: Router,
    private notify: NotificationService
  ) { }

  ngOnInit(): void {
    this.auth.getCurrentUser().then((user) => {
      if (user.manager) {
        let companyId: string = user.manager.company.uid;
        let managerId: string = user.manager.uid;

        this.db.getEmployees(companyId, managerId).then((employees) => {
          this.employees = employees;
        });
      }
      else this.router.navigate(['/dashboard']);
    })
  }

  removeEmployee(employeeID) {    
    this.notify.confirm("Çalışanı silmek istiyor musunuz?").then((result) => {
      if (result.isConfirmed) {
        this.notify.success("Çalışan Silindi")
        this.db
          .removeUser(employeeID)
          .then((user) => {
            console.log(user)
            location.reload()
          })
          .catch((err) => console.log('Çalışan Bulunamadı'));
      }
    })
  }
}