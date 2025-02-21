import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  constructor(private router: Router) {}

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
