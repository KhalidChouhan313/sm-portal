import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QrcodeService {
  constructor(private http: HttpClient) {}

  public generateCode(data): Observable<any> {
    return this.http.post(`${environment.qrApiUrl}/api/create/qrcode`, data);
  }

  public SaveQrImg(id, img): Observable<any> {
    return this.http.post(
      `${environment.qrApiUrl}/api/upload/qrcode/${id}`,
      img
    );
  }

  public getAllQrCodes(data): Observable<any> {
    return this.http.get(`${environment.qrApiUrl}/api/qrcode/details/${data}`);
  }

  public getQrCodeDetails(id): Observable<any> {
    return this.http.get(
      `${environment.qrApiUrl}/api/singleqrcode/details/${id}`
    );
  }

  public deleteQrCode(id): Observable<any> {
    return this.http.delete(`${environment.qrApiUrl}/api/delete/qrcode/${id}`);
  }

  public updateQrCode(id, data): Observable<any> {
    return this.http.put(
      `${environment.qrApiUrl}/api/update/qrcode/${id}`,
      data
    );
  }

  public updateQrCodeStatus(id, data): Observable<any> {
    return this.http.put(
      `${environment.qrApiUrl}/api/status/qrcode/${id}`,
      data
    );
  }

  public getQrCodeStats(id): Observable<any> {
    return this.http.get(`${environment.qrApiUrl}/api/getscannedqrcode/${id}`);
  }

  public updateQrImg(id, img): Observable<any> {
    return this.http.post(
      `${environment.qrApiUrl}/api/update/qrcode/${id}`,
      img
    );
  }

  public getPickupLocations(obj): Observable<any> {
    return this.http.post(`${environment.qrApiUrl}/api/pickup-address`, obj);
  }
}
