import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from 'src/services/auth/auth.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) { }

  user: any = null;
  title: string = 'Home';
  loading = true;

  ngOnInit(): void {
    this.checkAuthentication();

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.checkAuthentication();
      });
  }

  checkAuthentication(): void {
    const token = localStorage.getItem('token');
    this.loading = true;
    this.authService.authenticateUser(token).subscribe(
      (res) => {
        this.user = res;
        this.loading = false;
        localStorage.setItem('user_details', JSON.stringify(res));
      },
      (err) => {
        localStorage.removeItem('token');
        localStorage.removeItem('user_details');
        this.router.navigateByUrl('/login');
      }
    );
  }
}