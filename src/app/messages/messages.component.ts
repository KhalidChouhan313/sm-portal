import { Component } from '@angular/core';

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
      isEditable: false
    },
    {
      id: 2,
      name: "Booking Message 2",
      value: "",
      isEditable: false
    },
    {
      id: 3, name: "Booking Message 3",
      value: "",
      isEditable: false
    },
    {
      id: 4,
      name: "Booking Message 4",
      value: "",
      isEditable: false
    },
  ]

  toggleEdit = (id: Number) => {
    this.instanceData.forEach(i => i.id === id ? i.isEditable = !i.isEditable : i)
  }
}
