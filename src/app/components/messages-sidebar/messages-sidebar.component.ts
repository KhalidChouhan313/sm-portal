import { Component } from '@angular/core';

@Component({
  selector: 'app-messages-sidebar',
  templateUrl: './messages-sidebar.component.html',
  styleUrls: ['./messages-sidebar.component.css']
})
export class MessagesSidebarComponent {
  sidebarOpen = false;
  toggleSidebar = () => this.sidebarOpen = !this.sidebarOpen;

  sidebarMenu = [
    {
      id: 1,
      label: "Booking",
      icon: "",
      active: true
    },
    {
      id: 2,
      label: "Tracking",
      icon: "",
      active: false
    },
    {
      id: 3,
      label: "Arrived",
      icon: "",
      active: false
    },
    {
      id: 4,
      label: "Paylink",
      icon: "",
      active: false
    },
    {
      id: 5,
      label: "PrePay",
      icon: "",
      active: false
    },
    {
      id: 6,
      label: "Review",
      icon: "",
      active: false
    },
    {
      id: 7,
      label: "Driver",
      icon: "",
      active: false
    },
    {
      id: 8,
      label: "Pre Auth",
      icon: "",
      active: false
    },
    {
      id: 9,
      label: "Custom 1",
      icon: "",
      active: false
    },
    {
      id: 10,
      label: "Custom 2",
      icon: "",
      active: false
    },
    {
      id: 11,
      label: "ChatBot",
      icon: "",
      active: false
    },
    {
      id: 12,
      label: "Missed Calls",
      icon: "",
      active: false
    },
    {
      id: 13,
      label: "No Show",
      icon: "",
      active: false
    },
  ]

  toggleActive = (id: number) => {
    this.sidebarMenu.forEach(item => item.id === id ? item.active = true : item.active = false)
  }
}
