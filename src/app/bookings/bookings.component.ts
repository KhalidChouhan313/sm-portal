import { Component, OnInit } from '@angular/core';
import { BookingsService } from 'src/services/bookings/bookings.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})

export class BookingsComponent implements OnInit {

  constructor(private bookingsService: BookingsService) { }

  menuItems = [
    {
      name: "All Bookings",
      icon: ""
    },
    {
      name: "Complete",
      icon: ""
    },
    {
      name: "Cancel",
      icon: ""
    },
    {
      name: "Upcoming",
      icon: ""
    },
    {
      name: "In progress",
      icon: ""
    }
  ]

  currentItem: { name: string, icon: string } = this.menuItems[0];
  setCurrentItem = (item: any) => this.currentItem = item


  // bookings
  bookings: any[] = [];
  ngOnInit(): void {
    this.bookingsService.getAllBookings().subscribe(
      (res) => {
        console.log(res)
        this.bookings = res.data?.map((item: any) => ({ ...item, selected: false }))
      },
      (_) => {
        this.bookings = []
      }
    )
  };

  selectedBooking: string = "";
  selectBooking = (item: any) => {
    if (item._id === this.selectedBooking) {
      this.selectedBooking = ""
    } else {
      this.selectedBooking = item?._id
    }
  }

  // bookings dummy
  bookingsDummy = [
    {
      selected: false,
      booking_id: "56873038",
      company_id: "5fa33297c9ec66867188999f",
      createdAt: new Date("2024-11-26T10:46:34.924Z").toLocaleString(),
      date: "",
      phone: "923070186322",
      time: "ASAP",
      _id: "6745a70a75994f2a07415264a",
    },
  ]
}
