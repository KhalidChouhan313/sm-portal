import { Component } from '@angular/core';

@Component({
  selector: 'app-app-settings',
  templateUrl: './app-settings.component.html',
  styleUrls: ['./app-settings.component.css']
})
export class AppSettingsComponent {
  tabs = [
    {
      name: "SMS Settings",
      icon: "../../../assets/icons/sms.png"
    },
    {
      name: "Profile",
      icon: "../../../assets/icons/profile.png"
    },
    {
      name: "Notification",
      icon: "../../../assets/icons/notification.png"
    },
    {
      name: "Help & Support",
      icon: "../../../assets/icons/help.png"
    },
  ]
  currentTab: any = this.tabs[0];
  setCurrentTab = (item) => this.currentTab = item;

  togglesData = [
    {
      label: "Otp Sms",
      enabled: true
    },
    {
      label: "Booking Sms",
      enabled: true
    },
    {
      label: "Track Sms",
      enabled: true
    },
    {
      label: "Paylink Sms",
      enabled: true
    },
    {
      label: "Drivew Review Sms",
      enabled: true
    },
    {
      label: "Custom 1 Sms",
      enabled: true
    },
    {
      label: "Missed Call Sms",
      enabled: true
    },
    {
      label: "Late Sms",
      enabled: true
    },
    {
      label: "Arrived Sms",
      enabled: true
    },
    {
      label: "Review Sms",
      enabled: true
    },
    {
      label: "PreAuth Sms",
      enabled: true
    },
    {
      label: "Custom 2 Sms",
      enabled: true
    },
  ]
}