import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QrcodeService {
  constructor(private http: HttpClient) {}

  public generateCode(data): Observable<any> {
    return this.http.post(`${environment.qrApiUrl}/api/generate/qrcode`, data);
  }

  public getCode(data): Observable<any> {
    return this.http.get(`${environment.qrApiUrl}/api/fetch/qrcode/${data}`);
  }

  public getCodeDetails(data): Observable<any> {
    return this.http.get(`${environment.qrApiUrl}/api/qrcode/details/${data}`);
  }
}
