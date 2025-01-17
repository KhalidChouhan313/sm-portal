import { Component, AfterViewInit, Input } from '@angular/core';
import { Chart, Colors } from 'chart.js';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css']
})

export class BookingDetailsComponent implements AfterViewInit {

  @Input() asap = 0;
  @Input() pre_booking = 0;
  data = [];
  labels = [];
  colors = ['#964de5', '#7ce0d8']//['#e167ff', '#7ce0d8', '#964de5']
  ngAfterViewInit() {
    this.data = [this.asap, this.pre_booking]
    this.labels = ['ASAP', 'Pre Booking']
    new Chart('bookingDetailsChart', {
      type: 'doughnut',
      options: {
        cutout: '70%',
        plugins: {
          legend: {
            display: false
          },
        }
      },
      data: {
        labels: this.labels,
        datasets: [{
          data: this.data,
          backgroundColor: this.colors
        }]
      }
    });
  }
}