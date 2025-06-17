import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CartService } from './cart/cart.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoaderService } from './service/loader/loader.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FontAwesomeModule, RouterModule, RouterLink,FormsModule,ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
    isLoading$: Observable<boolean>; 
  isscrolled = false;
  showbutton = false;
  cartCount = 0;
isMenuOpen = false;
currentYear = new Date().getFullYear();
  newsletterForm: FormGroup;
  isSuccess = false;

constructor (private cartService: CartService,private router:Router,private fb: FormBuilder, public loaderService: LoaderService) {
  this.router.events.subscribe(event => {
    if (event instanceof NavigationEnd) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
     this.newsletterForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

        this.isLoading$ = this.loaderService.isLoading;
}
ngOnInit() {
  this.cartService.cartItemsCount$.subscribe(count => {
    this.cartCount = count;
  });
}


toggleMenu() {
  this.isMenuOpen = !this.isMenuOpen;
}

  

  scrolltop() {
    window.scrollTo({ top: 35, behavior: 'smooth' });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isscrolled = window.scrollY > 50;
    const scrollPosition = window.innerHeight + window.scrollY;
    const pageHeight = document.documentElement.scrollHeight;
    this.showbutton = scrollPosition >= pageHeight -600
  }

  profile(){
    const token = localStorage.getItem('token');

  if(token){
    this.router.navigate(['/profile'])
  }
  else{
    this.router.navigate(['/login'])
  }
  }

onSubmit() {
    if (this.newsletterForm.invalid) {
      this.markFormGroupTouched(this.newsletterForm);
      return;
    }

    // Just show success message without API call
    this.isSuccess = true;
    this.newsletterForm.reset();

    // Hide success message after 5 seconds
    setTimeout(() => {
      this.isSuccess = false;
    }, 5000);
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
