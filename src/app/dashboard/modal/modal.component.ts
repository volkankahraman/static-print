import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ValidationService } from 'src/app/shared/services/validation.service';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})

export class ModalComponent implements OnInit {
  @Input()
  sentState: boolean = false;

  @Output()
  onClose = new EventEmitter();

  constructor(private notify: NotificationService, private valid: ValidationService) { }

  mailAddress: string;
  mailName: string;
  companyName: string = "";

  ngOnInit(): void {
  }

  sendMail() {
    // console.log(this.mailAddress)
    // console.log(this.mailName)

    if (this.mailAddress && this.mailName) {
      if (this.valid.checkEmail(this.mailAddress)) {
        if (this.valid.checkFullName(this.mailName)) {
          var templateParams = {
            from_name: this.companyName,
            to_name: this.mailName,
            to_email: this.mailAddress,
            message: this.companyName + "tarafından gönderilen linke tıklayın google.com"
          };

          // console.log(templateParams)

          emailjs.send("service_plbvjsa", "template_wb9aoxv", templateParams, 'user_ap9e5pxx5z5g6LVeEWBC5')
            .then((result: EmailJSResponseStatus) => {
              console.log(result.text);
            }).catch((error) => {
              console.log(error.text);
            });
          this.onClose.emit(!this.sentState);
        }
        else
          this.notify.warning("Ad Soyad Sadece Harflerden Oluşmalıdır.")
      }
      else
        this.notify.warning("Geçerli Bir Email Adresi Giriniz.")
    }
    else
      this.notify.warning("Tüm Alanlar Doldurulmalıdır.")
  }

  close() {
    this.onClose.emit(this.sentState);
  }
}
