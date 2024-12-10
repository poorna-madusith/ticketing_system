import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../../../auth/components/services/storage/storage.service';

const BASE_URL = 'http://localhost:9000'; // Base URL for backend API

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  getAllTickets(): Observable<any> {
    return this.http.get(BASE_URL + '/api/customer/tickets', {
      headers: this.createAuthorizationHeader()
    });
  }

  buyTickets(ticketId: number, quantity: number): Observable<any> {
    return this.http.put(
      `${BASE_URL}/api/customer/buy-ticket/${ticketId}?quantity=${quantity}`,
      null, // No body required for the request
      { headers: this.createAuthorizationHeader() }
    );
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
