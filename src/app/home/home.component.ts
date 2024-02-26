import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  // cards data
  cardsData = [
    {
      label: "Total sent by SMS",
      count: "12000",
      icon: "../../assets/icons/pie.svg"
    },
    {
      label: "Total sent by Whatsapp",
      count: "12000",
      icon: "../../assets/icons/whatsapp.svg"
    },
    {
      label: "Total sent by SMS",
      count: "12000",
      icon: "../../assets/icons/messages.svg"
    },
  ]
}
