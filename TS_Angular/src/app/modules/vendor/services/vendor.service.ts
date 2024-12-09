import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../../../auth/components/services/storage/storage.service';

const BASE_URL = 'http://localhost:9000'; // Ensure this URL is correct

@Injectable({
  providedIn: 'root'
})
export class VendorService {
  constructor(private http: HttpClient) {}

  postTicket(ticketDto: FormData): Observable<any> {
    return this.http.post(`${BASE_URL}/api/vendor/ticket`, ticketDto, {
      headers: this.createAuthorizationHeader()
    });
  }


  getAllTickets():Observable<any>{
    return this.http.get(BASE_URL+"/api/vendor/tickets",{
      headers: this.createAuthorizationHeader()
    })
  }

  private createAuthorizationHeader(): HttpHeaders {
    const token = StorageService.getToken();
    if (!token) {
      console.warn('No token found in storage. Authentication may fail.');
    }
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }
}
