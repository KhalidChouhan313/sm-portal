import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/services';
import { AuthService } from 'src/services/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  constructor(private authService: AuthService, private AS: AdminService, private router: Router,) { }

  currentUser: any;
  deviceList = [];
  showFilters = false
  currentDevice: any;
  isLoad = true;
  isMsgLoad = true;
  deviceActive = false;

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('user_details'));
    console.log(this.currentUser)
    if (!this.currentUser) {
      this.router.navigateByUrl('/sessions/signin');
    }
    this.AS.getUser(this.currentUser._id).subscribe(usr => {
      this.currentUser = usr;
      this.deviceList = usr.wa_api.filter(d => d.status && (d.wa_api_platform == 'chatapi' || d.wa_api_platform == 'maytapi' || d.wa_api_platform == 'greenapi'))
      console.log("home",this.deviceList)
      
    });
  }
}
