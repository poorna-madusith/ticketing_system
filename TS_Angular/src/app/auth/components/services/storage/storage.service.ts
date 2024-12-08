import { Injectable } from '@angular/core';


const TOKEN = "token";
const USER = "user";


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  static saveToken(token:string):void{
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN,token);

  }

  static saveUser(user:any):void{
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER,JSON.stringify(user));
    
  }

  static getToken(){
    return window.localStorage.getItem(TOKEN);
  }

  static getUser() {
    const userString = localStorage.getItem(USER);
    return userString ? JSON.parse(userString) : null;
  }
  

  static getUserRole():string{
    const user = this.getUser();
    if(user == null) return "";
    return user.role;
  }

  static isVendorLoggedIn():boolean{
    if(this.getToken()==null) return false;
    const role:string = this.getUserRole();
    return role == "VENDOR";
  }

  static isCustomerLoggedIn():boolean{
    if(this.getToken()==null) return false;
    const role:string = this.getUserRole();
    return role == "CUSTOMER";
  }

  static logout():void{
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
  }
}
