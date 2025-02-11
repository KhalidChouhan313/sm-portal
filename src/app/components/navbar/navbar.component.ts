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
  currentUrl: string = '';
  constructor(private authService: AuthService, private router: Router) { 
    this.currentUrl = this.router.url;
    console.log("url", this.currentUrl)
  }

  user: any = null;
  title: string = 'dashboard';
  loading = true;
  showLogoutOptions = false;

  ngOnInit(): void {
    this.checkAuthentication();

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.checkAuthentication();
      });

      this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {

        

        this.currentUrl = event.urlAfterRedirects || event.url;
        this.currentUrl = `home${this.currentUrl.replace(/\//g, ' / ')}`;
        
        // Trim any leading or trailing spaces for more reliable comparison
        if (this.currentUrl.trim() === 'home /') {
          this.currentUrl = 'home / dashboard';
        }
        
        const urlParts = this.currentUrl.split(' / '); // Split by spaces around "/"
        this.title = urlParts[urlParts.length - 1];

        this.title = this.title.replace(/-/g, ' ');
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
        this.logoutHandler()
      }
    );
  }

  logoutHandler = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_details');
    this.router.navigateByUrl('/login');
  }
}