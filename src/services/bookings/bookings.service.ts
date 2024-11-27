import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {
  public bookings$ = [];

  constructor(private http: HttpClient) { }

  getAllBookings(): Observable<any> {
    const token = localStorage.getItem("token")
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`
    });

    return this.http.get(environment.apiUrl + "/api/waba/all-bookings", { headers });
  }
}
