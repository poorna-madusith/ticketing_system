import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  isSpinning = false;
  signupForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private message: NzMessageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidate.bind(this)]]
    });
  }

  confirmationValidate(control: FormControl): { [s: string]: boolean } {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.signupForm?.controls['password']?.value) {
      return { confirm: true };
    }
    return {};
  }

  register() {
    if (this.signupForm.valid) {
      this.isSpinning = true;
      this.authService.register(this.signupForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res?.id) {
            this.message.success("Signup successful", { nzDuration: 5000 });
            this.router.navigateByUrl('/login');
          } else {
            this.message.error("Signup failed", { nzDuration: 5000 });
          }
        },
        error: (error) => {
          console.error(error);
          this.message.error("Something went wrong", { nzDuration: 5000 });
        },
        complete: () => this.isSpinning = false
      });
    } else {
      this.message.error("Please fill in all required fields");
    }
  }
}
