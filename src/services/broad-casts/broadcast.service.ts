import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BroadcastService {
  constructor(private http: HttpClient) {}

  getBroadcast(Job_Id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.get(
      environment.broadcastUrl + `/api/web/status/marketing/${Job_Id}`,
      { headers }
    );
  }
  getallTemplates(company_id: string): Observable<any> {
    const token = environment.TOKEN;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.get(
      environment.broadcastUrl + `/api/web/fetch-meta-templates/${company_id}`,
      { headers }
    );
  }
  getallContacts(company_id: string): Observable<any> {
    const token = environment.TOKEN;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.get(
      environment.broadcastUrl + `/api/web/get-all-contacts/${company_id}`,
      { headers }
    );
  }
  getallGroup(company_id: string): Observable<any> {
    const token = environment.TOKEN;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.get(
      environment.broadcastUrl + `/api/web/groups/${company_id}`,
      { headers }
    );
  }

  deleteTemplates(
    company_id: string,
    template_id: string,
    name: string
  ): Observable<any> {
    const token = environment.TOKEN;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    const url = `${
      environment.broadcastUrl
    }/api/web/delete-meta-templates/${company_id}/${template_id}/${encodeURIComponent(
      name
    )}`;

    return this.http.delete(url, { headers });
  }

  createGroup(companyId: string, body: any): Observable<any> {
    const token = environment.TOKEN;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    const url = `${environment.broadcastUrl}/api/web/create-group/${companyId}`;
    return this.http.post(url, body, { headers });
  }
  DeleteGroup(companyId: string, groupId: string): Observable<any> {
    const token = environment.TOKEN;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    const url = `${environment.broadcastUrl}/api/web/delete-group/${companyId}`;
    return this.http.delete(url, { headers });
  }

  CreateNumber(companyId: string, body: any): Observable<any> {
    const token = environment.TOKEN;
    const headers = new HttpHeaders({
      // 'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    const url = `${environment.broadcastUrl}/api/web/add-contacts/${companyId}`;
    return this.http.post(url, body, { headers });
  }
  AddNumber(companyId: string, body: any): Observable<any> {
    const token = environment.TOKEN;
    const headers = new HttpHeaders({
      // 'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    const url = `${environment.broadcastUrl}/api/web/contacts/${companyId}`;
    return this.http.put(url, body, { headers });
  }
}
