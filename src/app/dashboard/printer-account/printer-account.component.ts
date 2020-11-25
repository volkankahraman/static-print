import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-printer-account',
  templateUrl: './printer-account.component.html',
  styleUrls: ['./printer-account.component.css']
})

export class PrinterAccountComponent implements OnInit {
  printAccount: boolean = false;
  showModal: boolean = false;

  constructor(private notify: NotificationService) { }

  addPrintAccount() {
    this.showModal = true;
  }

  addedPrinterAccount(state) {
    if (state) {
      this.showModal = !state;
      this.notify.success('Yazıcı Hesabı Eklendi ve Mail Gönderildi');
    } else this.showModal = state;
  }

  ngOnInit(): void {
  }
}