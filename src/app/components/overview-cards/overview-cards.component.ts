import { Component, Input, OnInit } from '@angular/core';
import { BookingsService } from 'src/services';

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
  constructor(private BS: BookingsService) {

  }

  ngOnInit(): void {
    let currentUser = JSON.parse(localStorage.getItem('user_details'));
    console.log(this.totalInteractions,
      this.totalBookings,
      this.bookingConversionRate,
      this.totalTripValue,
      this.averageFare);

    this.overviewCards = [
      { title: 'Total Interactions', value: this.totalInteractions ? this.totalInteractions : 0, description: '+12% this week' },
      { title: 'Total Bookings', value: this.totalBookings ? this.totalBookings : 0, description: '+8% this week' },
      { title: 'Booking Conversion Rate', value: `${this.bookingConversionRate}%`, description: '+3% this week' },
      { title: 'Total Trip Value', value: `£${this.totalTripValue ? this.totalTripValue : 0}`, description: '+£1,200 this week' },
      { title: 'Average Fare', value: `£${this.averageFare ? this.averageFare : 0}`, description: 'Higher than usual' }
    ];
  }
}