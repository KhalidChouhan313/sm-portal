import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/services';

@Component({
  selector: 'app-app-settings',
  templateUrl: './app-settings.component.html',
  styleUrls: ['./app-settings.component.css'],
})
export class AppSettingsComponent implements OnInit {
  isLoad = true;
  currentUser: any = {};
  togglesData = [];

  constructor(
    private AS: AdminService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isLoad = false;
    const storedUser = localStorage.getItem('user_details');
    this.currentUser = storedUser ? JSON.parse(storedUser) : null;

    if (!this.currentUser) {
      this.router.navigateByUrl('/login');
      return;
    }

    console.log(this.currentUser);

    // Initialize togglesData AFTER currentUser is assigned
    this.togglesData = [
      {
        label: 'Otp Sms',
        type: 'otp_sms',
        enabled: !!this.currentUser.otp_sms,
      },
      {
        label: 'Booking Sms',
        type: 'booking_sms',
        enabled: !!this.currentUser.booking_sms,
      },
      {
        label: 'Track Sms',
        type: 'track_sms',
        enabled: !!this.currentUser.track_sms,
      },
      {
        label: 'Paylink Sms',
        type: 'paylink_sms',
        enabled: !!this.currentUser.paylink_sms,
      },
      {
        label: 'Drivew Review Sms',
        type: 'dreview_sms',
        enabled: !!this.currentUser.dreview_sms,
      },
      {
        label: 'Custom 1 Sms',
        type: 'custom1_sms',
        enabled: !!this.currentUser.custom1_sms,
      },
      {
        label: 'Missed Call Sms',
        type: 'missedcall_sms',
        enabled: !!this.currentUser.missedcall_sms,
      },
      {
        label: 'Late Sms',
        type: 'late_sms',
        enabled: !!this.currentUser.late_sms,
      },
      {
        label: 'Arrived Sms',
        type: 'arrived_sms',
        enabled: !!this.currentUser.arrived_sms,
      },
      {
        label: 'Review Sms',
        type: 'review_sms',
        enabled: !!this.currentUser.review_sms,
      },
      {
        label: 'PreAuth Sms',
        type: 'preAuth_sms',
        enabled: !!this.currentUser.preAuth_sms,
      },
      {
        label: 'Custom 2 Sms',
        type: 'custom2_sms',
        enabled: !!this.currentUser.custom2_sms,
      },
    ];

    this.route.queryParams.subscribe((params) => {
      const tabName = params['tab'] || 'SMS Settings';
      this.currentTab =
        this.tabs.find((tab) => tab.name === tabName) || this.tabs[0];
    });
  }

  isActive: boolean = false;

  toggleColor(index: number) {
    this.togglesData[index].enabled = !this.togglesData[index].enabled;
  }

  changeSettings(e, type) {
    this.isLoad = true;
    let obj = {
      _id: this.currentUser._id,
    };
    obj[type] = e.target.checked;

    this.AS.updateUser(obj).subscribe((res) => {
      console.log(res);
      console.log(this.togglesData);
      this.isLoad = false;
    });
  }

  tabs = [
    {
      name: 'SMS Settings',
      icon: '../../../assets/icons/sms.png',
    },
    {
      name: 'Profile',
      icon: '../../../assets/icons/profile.png',
    },
    {
      name: 'Notification',
      icon: '../../../assets/icons/notification.png',
    },
    {
      name: 'Help & Support',
      icon: '../../../assets/icons/help.png',
    },
  ];
  currentTab: any = this.tabs[1];
  setCurrentTab = (item) => (this.currentTab = item);
}
