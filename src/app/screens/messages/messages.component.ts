import { Component, NgModule } from '@angular/core';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})

export class MessagesComponent {
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
      name: "Booking Message 4",
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
