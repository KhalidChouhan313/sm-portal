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
  toggles = [];

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

    this.toggles = [
      {
        label: 'Allow all messages via official whatsapp',
        enabled:
          this.currentUser.waba_check === 'all_route_waba' ||
          this.currentUser.waba_check === 'all_waba',
      },
      {
        label: 'Allow only waba hooks via official whatsapp',
        enabled: this.currentUser.waba_check === 'all_route_waba',
      },
    ];
  }

  isActive: boolean = false;

  firstToggleSwitch(index: number, event: Event): void {
    event.preventDefault();

    // If clicking the second toggle and the first is disabled, do nothing
    if (index === 1 && !this.toggles[0].enabled) {
      return; // Block interaction
    }

    // Toggle the current switch
    this.toggles[index].enabled = !this.toggles[index].enabled;

    // If first toggle is turned off, disable the second toggle
    if (index === 0 && !this.toggles[0].enabled) {
      this.toggles[1].enabled = false;
    }

    console.log(`Toggle ${index + 1} Status:`, this.toggles[index].enabled);

    let waba_check = '';

    if (this.toggles[0].enabled && this.toggles[1].enabled) {
      waba_check = 'all_route_waba';
    } else if (this.toggles[0].enabled) {
      waba_check = 'all_waba';
    } else {
      waba_check = 'no_waba';
    }

    const obj = {
      _id: this.currentUser._id,
      waba_check: waba_check,
    };

    console.log(obj);

    this.AS.updateUser(obj).subscribe((res) => {
      console.log(res);
    });
  }

  toggleColor(index: number, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;

    // Update the togglesData
    this.togglesData[index].enabled = isChecked;

    // Create the update object
    const updateObj = {
      _id: this.currentUser._id,
      [this.togglesData[index].type]: isChecked,
    };

    this.isLoad = true;

    // Send update request
    this.AS.updateUser(updateObj).subscribe((res) => {
      console.log('Update Response:', res);
      this.isLoad = false;
    });
  }

  changeSettings(e, type) {
    this.isLoad = true;
    let obj = {
      _id: this.currentUser._id,
    };
    obj[type] = e.target.checked;
    console.log(obj);

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
