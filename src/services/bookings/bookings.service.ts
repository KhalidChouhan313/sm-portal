import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {
  public bookings$ = [];
  token: any;
  headers: any;
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem("token")
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${this.token}`
    });
  }

  public getAllBookings(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/waba/all-bookings`, { headers: this.headers });
  }

  public getBookingDetails(booking_id, bot_id): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/waba/booking-details/${booking_id}/${bot_id}`, { headers: this.headers });
  }

  public getCompanyBookings(company_id): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/waba/company-bookings/${company_id}`, { headers: this.headers });
  }

  public getCompanyBots(company_id): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/waba/company-bots/${company_id}`, { headers: this.headers });
  }

  public updateBotAdmin(obj) {
    return this.http.put(`${environment.apiUrl}/api/waba//bot-settings`, obj);
  }

  public updateMessage(obj) {
    return this.http.put(`${environment.apiUrl}/api/waba/message`, obj);
  }

  public getBotMessages(id) {
    return this.http.get(`${environment.apiUrl}/api/waba/messages/${id}`);
  }
}
