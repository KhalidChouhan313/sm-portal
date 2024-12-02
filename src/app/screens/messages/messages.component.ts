import { Component, NgModule } from '@angular/core';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})

export class MessagesComponent {

  tab = ""
  tabs = [
    { name: "Booking" },
    { name: "Tracking" },
    { name: "Arrived" },
    { name: "Paylink" },
    { name: "PrePay" },
    { name: "Review" },
    { name: "Driver" },
    { name: "Pre Auth" },
    { name: "Custom 1" },
    { name: "Custom 2" },
    { name: "ChatBot" },
    { name: "Missed Calls" },
  ]

  selectTab = (t) => {
    this.tab = t
  }

  instanceData = [
    {
      id: 1,
      name: "Booking Message 1",
      value: "",
      isEditable: false,
      limit: 0
    },
    {
      id: 2,
      name: "Booking Message 2",
      value: "",
      isEditable: false,
      limit: 0
    },
    {
      id: 3, name: "Booking Message 3",
      value: "",
      isEditable: false,
      limit: 0
    },
    {
      id: 4,
      name: "Booking Message 1",
      value: "",
      isEditable: false,
      limit: 128
    },
  ]

  toggleEdit = (id: Number) => {
    this.instanceData.forEach(i => i.id === id ? i.isEditable = !i.isEditable : i)
  }

  onTextAreaChange(instance: any, newValue: string) {
    instance.value = newValue;
  }
}
