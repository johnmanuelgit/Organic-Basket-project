import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import {Router, RouterLink, RouterModule } from '@angular/router';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, RouterModule, RouterLink,FormsModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  showPassword = false;
  loginForm:FormGroup;
  

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

constructor (private http:HttpClient,private router:Router ,private cartService:CartService){
  this.loginForm = new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
      LoginComponent.uppercaseValidator

    ]),
  });
}
static uppercaseValidator(control: AbstractControl): ValidationErrors | null {
  const hasUppercase = /[A-Z]/.test(control.value);
  return hasUppercase ? null : { uppercase: true };
}
login() {
  if (this.loginForm.invalid) {
    return;
  }

  this.http.post<any>('https://bakendrepo.onrender.com/login', this.loginForm.value).subscribe({
    next: (res) => {
      localStorage.setItem('userId', res.user._id);
      localStorage.setItem('token', res.token);
      this.cartService.fetchCartFromBackend();
      alert('Login successful!');
      this.router.navigate(['/home']);
    },
    error: (err) => {
      if (err.status === 404) {
        alert("User not found");
      } else if (err.status === 401) {
        alert("Incorrect password");
      } else {
        alert("Login failed");
      }
    }
  });
}

}
