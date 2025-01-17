import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-overview-cards',
  templateUrl: './overview-cards.component.html',
  styleUrls: ['./overview-cards.component.css']
})
export class OverviewCardsComponent implements OnInit {
  @Input() totalInteractions = 0;
  @Input() totalBookings = 0;
  @Input() bookingConversionRate = 0;
  @Input() totalTripValue = 0;
  @Input() averageFare = 0;
  overviewCards = [];
  constructor() {

  }

  ngOnInit(): void {
    console.log(this.totalInteractions,
      this.totalBookings,
      this.bookingConversionRate,
      this.totalTripValue,
      this.averageFare);

    this.overviewCards = [
      { title: 'Total Interactions', value: this.totalInteractions, description: '+12% this week' },
      { title: 'Total Bookings', value: this.totalBookings, description: '+8% this week' },
      { title: 'Booking Conversion Rate', value: `${this.bookingConversionRate}%`, description: '+3% this week' },
      { title: 'Total Trip Value', value: `${this.totalTripValue}`, description: '+£1,200 this week' },
      { title: 'Average Fare', value: `£${this.averageFare}`, description: 'Higher than usual' }
    ];
  }
}