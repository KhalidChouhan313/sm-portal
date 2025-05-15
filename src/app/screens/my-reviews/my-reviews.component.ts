import { Component, OnInit } from '@angular/core';
import { QrcodeService } from 'src/services/qrcode/qrcode.service';

@Component({
  selector: 'app-my-reviews',
  templateUrl: './my-reviews.component.html',
  styleUrls: ['./my-reviews.component.css'],
})
export class MyReviewsComponent implements OnInit {
  stars = Array(5).fill(0);
  rating = 0;
  hovered = 0;
  currentUser: any;

  reviews: any;

  constructor(private qrSer: QrcodeService) {}

  ngOnInit(): void {
    const storedUser = localStorage.getItem('user_details');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
      console.log(this.currentUser); // full object
      // console.log(this.currentUser.name); // access specific properties
    }
    this.qrSer.getReviews(this.currentUser._id, 1).subscribe((res) => {
      console.log(res);
      this.reviews = res.data;
    });
  }

  clear() {
    this.rating = 0;
    this.qrSer.getReviews(this.currentUser._id, 1).subscribe((res) => {
      console.log(res);
      this.reviews = res.data;
    });
  }

  setRating(value: number) {
    this.rating = value;
    this.qrSer
      .getReviewsFitered(this.currentUser._id, 1, this.rating)
      .subscribe(
        (res) => {
          console.log(res);
          this.reviews = res.data;
        },
        (err) => {
          this.reviews = [];
        }
      );
  }

  hoverRating(value: number) {
    this.hovered = value;
  }

  getStarClass(rating: number, index: number): string {
    if (rating === 5) {
      return 'dark-green';
    }
    if (rating >= 3 && index < rating) {
      return 'light-gray';
    }
    if (rating === 2 && index < 2) {
      return 'red';
    }
    if (rating === 1 && index === 0) {
      return 'red';
    }
    return '';
  }
}
