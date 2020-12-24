import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';

@Component({
  selector: 'app-password-strength-meter',
  templateUrl: './password-strength-meter.component.html',
  styleUrls: ['./password-strength-meter.component.css']
})
export class PasswordStrengthMeterComponent implements OnInit, OnChanges {
  @Input() password: string;
  @Input() minLength: number = 6;
  @Input() numberCheck?: boolean = true;
  @Input() specialCharCheck?: boolean = true;
  @Input() smallcaseCheck?: boolean = true;
  @Input() uppercaseCheck?: boolean = true;

  @Output() strengthChange = new EventEmitter<number>();
  public strengthText: string = '';
  public score: number = 0;
  public feedbackArr: Array<Object> = [];
  constructor() { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.password) {
      this.checkStrength();
    }
  }

  checkStrength() {
    let totalCriteria = 1;
    totalCriteria = this.numberCheck ? totalCriteria + 1 : totalCriteria;
    totalCriteria = this.specialCharCheck ? totalCriteria + 1 : totalCriteria;
    totalCriteria = this.smallcaseCheck ? totalCriteria + 1 : totalCriteria;
    totalCriteria = this.uppercaseCheck ? totalCriteria + 1 : totalCriteria;
    this.feedbackArr = [];
    this.score = 0;
    this.score = this.isLengthMet() ? this.score + parseFloat((100 / totalCriteria).toFixed(2)) : this.score;
    this.score = this.specialCharCheck && this.isSpecialCharMet() ? this.score + parseFloat((100 / totalCriteria).toFixed(2)) : this.score;
    this.score = this.numberCheck && this.isNumberMet() ? this.score + parseFloat((100 / totalCriteria).toFixed(2)) : this.score;
    this.score = this.smallcaseCheck && this.isSmallcaseMet() ? this.score + parseFloat((100 / totalCriteria).toFixed(2)) : this.score;
    this.score = this.uppercaseCheck && this.isUppercaseMet() ? this.score + parseFloat((100 / totalCriteria).toFixed(2)) : this.score;
    this.getStrengthText();
    this.strengthChange.emit(this.score)
  }

  isLengthMet() {
    if (this.password.length >= this.minLength) {
      this.feedbackArr.push({ 'label': `En az ${this.minLength} karakter`, status: true });
      return true;
    } else {
      this.feedbackArr.push({ 'label': `En az ${this.minLength} karakter`, status: false });
      return false;
    }
  }

  isSpecialCharMet() {
    if ((/[!@#$%*]/).test(this.password)) {
      this.feedbackArr.push({ 'label': `Bir tane özel karakter`, status: true });
      return true;
    } else {
      this.feedbackArr.push({ 'label': `Bir tane özel karakter`, status: false });
      return false;
    }
  }

  isNumberMet() {
    if ((/[0-9]/).test(this.password)) {
      this.feedbackArr.push({ 'label': `Bir sayı`, status: true });
      return true;
    } else {
      this.feedbackArr.push({ 'label': `Bir sayı`, status: false });
      return false;
    }
  }

  isSmallcaseMet() {
    if ((/[a-z]/).test(this.password)) {
      this.feedbackArr.push({ 'label': `Bir tane küçük karakter`, status: true });
      return true;
    } else {
      this.feedbackArr.push({ 'label': `Bir tane küçük karakter`, status: false });
      return false;
    }
  }

  isUppercaseMet() {
    if ((/[A-Z]/).test(this.password)) {
      this.feedbackArr.push({ 'label': `Bir tane büyük karakter`, status: true });
      return true;
    } else {
      this.feedbackArr.push({ 'label': `Bir tane büyük karakter`, status: false });
      return false;
    }
  }

  getStrengthText() {
    this.strengthText = ''
    switch (this.score) {
      case 1:
      case 20:
      case 25:
        this.strengthText = 'Kısa';
        break;
      case 2:
      case 33.33:
      case 40:
        this.strengthText = 'Güçsüz';
        break;
      case 3:
      case 60:
      case 50:
      case 66.66:
        this.strengthText = 'Uygun';
        break;
      case 4:
      case 80:
      case 75:
        this.strengthText = 'İyi';
        break;
      case 5:
      case 100:
      case 99.99:
        this.strengthText = 'Zor';
        break;

    }
  }
}
