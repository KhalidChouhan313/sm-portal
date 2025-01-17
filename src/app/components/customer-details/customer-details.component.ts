import { Component } from '@angular/core';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent {
  customers = [
    { name: 'John Doe', address: '123 Main Street', date: 'Tue, Jul 12, 2022', bookings: 3, dropOff: '456 Elm Road', vehicle: 'Saloon' },
    { name: 'John Doe', address: '123 Main Street', date: 'Tue, Jul 12, 2022', bookings: 3, dropOff: '456 Elm Road', vehicle: 'Saloon' },
    { name: 'John Doe', address: '123 Main Street', date: 'Tue, Jul 12, 2022', bookings: 3, dropOff: '456 Elm Road', vehicle: 'Saloon' },
    { name: 'John Doe', address: '123 Main Street', date: 'Tue, Jul 12, 2022', bookings: 3, dropOff: '456 Elm Road', vehicle: 'Saloon' },
    { name: 'John Doe', address: '123 Main Street', date: 'Tue, Jul 12, 2022', bookings: 3, dropOff: '456 Elm Road', vehicle: 'Saloon' },
    { name: 'John Doe', address: '123 Main Street', date: 'Tue, Jul 12, 2022', bookings: 3, dropOff: '456 Elm Road', vehicle: 'Saloon' },
    { name: 'John Doe', address: '123 Main Street', date: 'Tue, Jul 12, 2022', bookings: 3, dropOff: '456 Elm Road', vehicle: 'Saloon' },
    { name: 'John Doe', address: '123 Main Street', date: 'Tue, Jul 12, 2022', bookings: 3, dropOff: '456 Elm Road', vehicle: 'Saloon' },
    { name: 'John Doe', address: '123 Main Street', date: 'Tue, Jul 12, 2022', bookings: 3, dropOff: '456 Elm Road', vehicle: 'Saloon' },
    { name: 'John Doe', address: '123 Main Street', date: 'Tue, Jul 12, 2022', bookings: 3, dropOff: '456 Elm Road', vehicle: 'Saloon' },
    { name: 'John Doe', address: '123 Main Street', date: 'Tue, Jul 12, 2022', bookings: 3, dropOff: '456 Elm Road', vehicle: 'Saloon' },
  ];
}