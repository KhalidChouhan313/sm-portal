import { Component } from '@angular/core';

@Component({
  selector: 'app-broadcast-sms',
  templateUrl: './broadcast-sms.component.html',
  styleUrls: ['./broadcast-sms.component.css']
})
export class BroadcastSmsComponent {
  drafts = [
    {
      date: new Date().toLocaleString(),
      name: "LesGo",
      contacts: "B T PF T",
      delay: "1 Minute",
      messages: "Book the taxi for your trip, because it will take you so long.",
      status: "Completed"
    },
    {
      date: new Date().toLocaleString(),
      name: "LesGo",
      contacts: "B T PF T",
      delay: "1 Minute",
      messages: "Book the taxi for your trip, because it will take you so long.",
      status: "Completed"
    },
    {
      date: new Date().toLocaleString(),
      name: "LesGo",
      contacts: "B T PF T",
      delay: "1 Minute",
      messages: "Book the taxi for your trip, because it will take you so long.",
      status: "Completed"
    },
    {
      date: new Date().toLocaleString(),
      name: "LesGo",
      contacts: "B T PF T",
      delay: "1 Minute",
      messages: "Book the taxi for your trip, because it will take you so long.",
      status: "Completed"
    },
    {
      date: new Date().toLocaleString(),
      name: "LesGo",
      contacts: "B T PF T",
      delay: "1 Minute",
      messages: "Book the taxi for your trip, because it will take you so long.",
      status: "Completed"
    }
  ]
}
