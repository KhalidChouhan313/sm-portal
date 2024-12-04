import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/services';
import { AuthService } from 'src/services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  constructor(private authService: AuthService, private adminServices: AdminService) { }
  devices = []

  ngOnInit(): void {
    this.adminServices.getDevices().subscribe(
      (res) => { console.log(res) },
      (err) => { console.log(err) },
    )
  }

}
