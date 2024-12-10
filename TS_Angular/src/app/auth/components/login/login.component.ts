import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { StorageService } from '../services/storage/storage.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  isSpinning:boolean = false;
  loginForm!: FormGroup;
 


  constructor(private fb:FormBuilder,
    private authService:AuthService,
    private router: Router,
    private message:NzMessageService
     

  ){}

  ngOnInit(){
    this.loginForm = this.fb.group({
      email:[null,[Validators.email,Validators.required]],
      password:[null,[Validators.required]]
    })
  }

  login() {
    // Set the spinner to true while the request is in progress
    this.isSpinning = true;
  
    // Log the form values
    console.log(this.loginForm.value);
  
    // Call the login method of the AuthService
    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        console.log(res);
  
        // If userId exists in the response, process the login
        if (res.userId != null) {
          const user = {
            id: res.userId,
            role: res.userRole,
          };
  
          // Save the user details and token
          StorageService.saveUser(user);
          StorageService.saveToken(res.jwt);
  
          // Navigate to the respective dashboard based on the role
          if (StorageService.isVendorLoggedIn()) {
            this.router.navigateByUrl('/vendor/dashboard');
          } else if (StorageService.isCustomerLoggedIn()) {
            this.router.navigateByUrl('/customer/dashboard');
          } else {
            this.message.error('Bad credentials', { nzDuration: 5000 });
          }
        }
      },
      error: (err) => {
        // Handle error scenarios
        console.error(err);
        this.message.error('Login failed. Please check your credentials and try again.', { nzDuration: 5000 });

        setTimeout(() => {
          location.reload();
        }, 1000);
      },
      complete: () => {
        // Set the spinner to false when the request completes
        this.isSpinning = false;
      },
    });
  }
  

}
