import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BookingsService } from 'src/services';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  constructor(
    private router: Router,
    private bookingsService: BookingsService
  ) {}

  loading = true;
  haveBot = false;

  ngOnInit(): void {
    let currentUser = JSON.parse(localStorage.getItem('user_details'));
    if (!currentUser) {
      this.router.navigateByUrl('/sessions/signin');
    }
    // console.log(currentUser._id);

    this.bookingsService.getCompanyBookings(currentUser._id).subscribe(
      (res) => {
        this.loading = false;
        this.haveBot = true;
      },
      (err) => {
        this.loading = false;
        this.haveBot = false;
      }
    );
  }

  currentItem = '';
  setCurrentItem = (e: string) => (this.currentItem = e);
  currentSubItem = '';
  setCurrentSubItem = (e: string) => (this.currentSubItem = e);

  isToggled = false;
  toggleNavbar = () => (this.isToggled = !this.isToggled);

  logoutHandler = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_details');
    this.router.navigateByUrl('/login');
  };
}
