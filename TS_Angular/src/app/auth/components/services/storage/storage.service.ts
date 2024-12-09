import { Injectable } from '@angular/core';

const TOKEN = 'token';
const USER = 'user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  static saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }

  static saveUser(user: any): void {
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));
  }

  static getToken(): string | null {
    return window.localStorage.getItem(TOKEN);
  }

  static getUser(): any {
    const userString = localStorage.getItem(USER);
    return userString ? JSON.parse(userString) : null;
  }

  static getUserRole(): string {
    const user = this.getUser();
    return user?.role ?? '';
  }

  static isVendorLoggedIn(): boolean {
    const token = this.getToken();
    const role = this.getUserRole();
    return token !== null && role === 'VENDOR';
  }

  static isCustomerLoggedIn(): boolean {
    const token = this.getToken();
    const role = this.getUserRole();
    return token !== null && role === 'CUSTOMER';
  }

  static logout(): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
  }
}
