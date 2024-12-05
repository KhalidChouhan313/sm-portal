import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { BotService } from 'src/services';

@Component({
  selector: 'app-block-list',
  templateUrl: './block-list.component.html',
  styleUrls: [
    './block-list.component.css',
  ]
})
export class BlockListComponent {
  tabs = [
    "All Messages",
    "WhatsApp",
    "SMS"
  ]
  tab: any = this.tabs[0];
  showBanner = true;

  showAddCon = false
  currentUser: any;
  blacklist = [];
  phone = '';
  isLoad = true;
  whatsapp = false;
  sms = false;
  type = ""

  updateType(event: Event): void {
    this.type = (event.target as HTMLSelectElement).value;
  }

  updatePhone(event: Event): void {
    this.phone = (event.target as HTMLInputElement).value;
  }

  constructor(
    private router: Router,
    private BS: BotService
  ) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('user_details'));
    if (!this.currentUser) {
      this.router.navigateByUrl('/login');
    }
    this.BS.getBlacklistUser(this.currentUser._id).subscribe(list => {
      this.blacklist = list
      this.isLoad = false;
    })
  }

  addBlacklistUser() {
    this.isLoad = true;
    let obj = {
      user_id: this.currentUser._id,
      phone: this.phone,
      whatsapp: this.type === "whatsapp" ? true : false,
      sms: this.type === "sms" ? true : false
    }
    this.BS.setBlacklistUser(obj).subscribe(usr => {
      this.phone = '';
      this.type = '';
      this.blacklist.push(usr)
      this.isLoad = false;
      this.whatsapp = false;
      this.sms = false;
      this.showAddCon = false
    }, err => {
      if (err.status == 400) {
        alert('Number already exist..!')
        this.isLoad = false;
        this.whatsapp = false;
        this.sms = false;
        this.phone = '';
      }
    })
  }

  blockWhatsApp(e, user, index) {
    this.isLoad = true;
    let obj = {
      _id: user,
      whatsapp: e
    }

    this.BS.updateBlacklistUser(obj).subscribe(usr => {
      this.blacklist[index].whatsapp = e
      this.isLoad = false;
      this.whatsapp = false;
      this.sms = false;
    }, err => {
      this.phone = '';
      this.isLoad = false;
      this.whatsapp = false;
      this.sms = false;
    })
  }

  blockSms(e, user, index) {
    this.isLoad = true;
    let obj = {
      _id: user,
      sms: e
    }

    this.BS.updateBlacklistUser(obj).subscribe(usr => {
      this.blacklist[index].sms = e
      this.isLoad = false;
      this.whatsapp = false;
      this.sms = false;
    }, err => {
      this.phone = '';
      this.isLoad = false;
      this.whatsapp = false;
      this.sms = false;
    })
  }

  deleteBlacklistUser(user, index) {
    this.isLoad = true
    this.BS.deleteBlacklistUser(user).subscribe(usr => {
      this.blacklist.splice(index, 1)
      this.isLoad = false
    }, err => {
      this.isLoad = false
    })
  }
}
