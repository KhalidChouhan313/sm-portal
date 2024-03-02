import { Component } from '@angular/core';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent {
  devices = [
    {
      id: 1,
      name: "Motorola",
      model: "Motorola Moto Edge 30",
      auth_status: "Authenticated",
      connection: "Active",
    },
    {
      id: 2,
      name: "Samsung",
      model: "Samsung Note 10 Ultra",
      auth_status: "Not-Authenticated",
      connection: "Inactive"
    },
    {
      id: 3,
      name: "Samsung",
      model: "Samsung Note 10 Ultra",
      auth_status: "Not-Authenticated",
      connection: "Inactive"
    },
    {
      id: 4,
      name: "Samsung",
      model: "Samsung Note 10 Ultra",
      auth_status: "Not-Authenticated",
      connection: "Inactive"
    },
  ]

  current: any = this.devices?.[0]

  setCurrent = (id: number) => {
    this.current = this.devices.find(i => i.id === id)
  }
}
