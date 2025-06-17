import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, RouterModule, RouterLink,FormsModule,ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  showPassword:boolean = false;
  signupform:FormGroup;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  
constructor (private http:HttpClient,private router:Router,private toast:ToastrService){
  this.signupform = new FormGroup({
    name:new FormControl('',[Validators.required]),
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
      SignupComponent.uppercaseValidator

    ]),
  });
}
static uppercaseValidator(control: AbstractControl): ValidationErrors | null {
  const hasUppercase = /[A-Z]/.test(control.value);
  return hasUppercase ? null : { uppercase: true };
}
register() {
  this.http.post('https://bakendrepo.onrender.com/register', this.signupform.value).subscribe({
    
    next: (res) => {
      console.log('Registration successful:', res);
       this.toast.success('Registered Successfully');
      this.router.navigate(['/login']);
    },
    error: (err) => {
      if (err.status === 400) {
        this.toast.warning('Email already registered');
        this.router.navigate(['/login']);
      } else {
        this.toast.error('Registration failed');
      }
    }
  });
}

}
