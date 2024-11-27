import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth/auth.service';
import { CustomersService } from 'src/services/customers/customers.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  constructor(private authService: AuthService, private customersService: CustomersService) { }

  customers = [];

  ngOnInit(): void {
    const token = localStorage.getItem("token")
    this.authService.authenticateUser(token as string).subscribe(
      (res) => {
        if (res?._id) {
          this.customersService.getCompanyUsers(res?._id).subscribe(
            (res) => { console.log(res) },
            (err) => { console.log(err) }
          )
        }
      },
      (err) => {
        console.log(err)
      }
    )
  }
}
