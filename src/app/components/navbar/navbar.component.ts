import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'src/types/menu-item';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private router: Router) { }

  // nav menu 
  menuItems = [
    {
      label: "Dashboard",
      activeIcon: "../../../assets/icons/dashboard.svg",
      icon: "../../../assets/icons/dashboard_active.svg",
      link: "/"
    },
    {
      label: "Messages",
      activeIcon: "../../../assets/icons/messages.svg",
      icon: "../../../assets/icons/messages_active.svg",
      link: "/messages"
    },
    {
      label: "Block List",
      activeIcon: "../../../assets/icons/block.svg",
      icon: "../../../assets/icons/block_active.svg",
      link: "/block-list"
    },
    {
      label: "Devices",
      activeIcon: "../../../assets/icons/devices.svg",
      icon: "../../../assets/icons/devices_active.svg",
      link: "/devices"
    },
  ];

  isMenuItemActive(menuItem: MenuItem): string {
    return this.router.url === menuItem.link ? 'active' : '';
  }

  // sidebar
  isSettingsOpen = false;
  toggleSettings = () => this.isSettingsOpen = !this.isSettingsOpen;

  sidebarItems = [
    {
      id: 1,
      label: "OTP SMS",
      active: true
    },
    {
      id: 2,
      label: "OTP SMS",
      active: false
    },
    {
      id: 3,
      label: "OTP SMS",
      active: false
    },
    {
      id: 4,
      label: "OTP SMS",
      active: false
    },
    {
      id: 5,
      label: "OTP SMS",
      active: false
    },
    {
      id: 6,
      label: "OTP SMS",
      active: false
    },
    {
      id: 7,
      label: "OTP SMS",
      active: false
    },
    {
      id: 8,
      label: "OTP SMS",
      active: false
    },
    {
      id: 9,
      label: "OTP SMS",
      active: false
    },
    {
      id: 10,
      label: "OTP SMS",
      active: false
    },
    {
      id: 11,
      label: "OTP SMS",
      active: false
    },
    {
      id: 12,
      label: "OTP SMS",
      active: false
    }
  ]

  toggleActiveStatus = (id: number) => {
    this.sidebarItems.forEach(item => item.id === id ? item.active = !item.active : item.active)
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }
}