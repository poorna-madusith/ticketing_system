import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { StorageService } from '../../../auth/components/services/storage/storage.service';

const BASE_URL = 'http://localhost:9000'; 


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient) { }

  getAllTickets():Observable<any>{
    return this.http.get(BASE_URL+"/api/customer/tickets",{
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
