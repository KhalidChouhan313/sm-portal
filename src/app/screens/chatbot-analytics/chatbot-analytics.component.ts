import { Component } from '@angular/core';
import { BookingsService } from 'src/services';

@Component({
  selector: 'app-chatbot-analytics',
  templateUrl: './chatbot-analytics.component.html',
  styleUrls: ['./chatbot-analytics.component.css']
})
export class ChatbotAnalyticsComponent {
  constructor(private bookingService: BookingsService,) { }
  devices = []
  showFilters = false
  data: any;

  ngOnInit(): void {
    let currentUser = JSON.parse(localStorage.getItem('user_details'));
    console.log(currentUser);

    this.bookingService.getChatbotDashboardDetails(currentUser._id).subscribe(
      (res) => {
        this.data = res;
        console.log(this.data);

      }
    )
  }
}
