import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) { }
  user: any = null;
  title: string = "Home"
  loading = true

  ngOnInit(): void {
    const token = localStorage.getItem("token");
    this.authService.authenticateUser(token).subscribe(
      (res) => {
        this.user = res;
        this.loading = false;
      },
      (err) => {
        this.router.navigateByUrl("/login")
      }
    )
  }
}