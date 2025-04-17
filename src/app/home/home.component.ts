import { CommonModule } from '@angular/common';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import 'swiper/css';


interface Testimonial {
  id: number;
  name: string;
  location: string;
  image: string;
  quote: string;
}
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit, OnDestroy  {

  fullName: string = '';
  email: string = '';
  nameError: boolean = false;
  emailError: boolean = false;


  subscribe() {
    // Reset errors
    this.nameError = false;
    this.emailError = false;

    // Validation
    if (!this.fullName.trim()) {
      this.nameError = true;
    }

    if (!this.email.trim() || !this.validateEmail(this.email)) {
      this.emailError = true;
    }

    if (this.nameError || this.emailError) {
      return;
    }

    // Success: Print data in console and show alert
    console.log('Subscribed with:', { name: this.fullName, email: this.email });
    alert('Thank you for subscribing!');

    // Clear input fields after submission
    this.fullName = '';
    this.email = '';
  }

  validateEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }

  // autto paginatuion 
  testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Rina Shah",
      location: "Delhi",
      image: "https://themangobasket.com/wp-content/webp-express/webp-images/uploads/2020/12/Rina-Shah.png.webp",
      quote: "I ordered mangoes from Mango Basket for my family and they loved it. It is very fresh, healthy and delicious."
    },
    {
      id: 2,
      name: "Jaydeep Bagul",
      location: "Pune",
      image: "https://themangobasket.com/wp-content/webp-express/webp-images/uploads/2021/01/jaydeep-bagul.png.webp",
      quote: "I ordered mangoes from Mango Basket for my family and they loved it. It is very fresh, healthy and delicious."
    },
    {
      id: 3,
      name: "Meenakshi Kharat",
      location: "Ratnagiri",
      image: "https://themangobasket.com/wp-content/webp-express/webp-images/uploads/2021/01/meenakshi-kharat.png.webp",
      quote: "I ordered mangoes from Mango Basket for my family and they loved it. It is very fresh, healthy and delicious."
    },
    {
      id: 4,
      name: "Rina Shah",
      location: "Delhi",
      image: "https://themangobasket.com/wp-content/webp-express/webp-images/uploads/2020/12/Rina-Shah.png.webp",
      quote: "I ordered mangoes from Mango Basket for my family and they loved it. It is very fresh, healthy and delicious."
    },
    {
      id: 5,
      name: "Meenakshi Kharat",
      location: "Ratnagiri",
      image: "https://themangobasket.com/wp-content/webp-express/webp-images/uploads/2021/01/meenakshi-kharat.png.webp",
      quote: "I ordered mangoes from Mango Basket for my family and they loved it. It is very fresh, healthy and delicious."
    },
    {
      id: 6,
      name: "Jaydeep Bagul",
      location: "Pune",
      image: "https://themangobasket.com/wp-content/webp-express/webp-images/uploads/2021/01/jaydeep-bagul.png.webp",
      quote: "I ordered mangoes from Mango Basket for my family and they loved it. It is very fresh, healthy and delicious."
    }

  ];

 currentPage = 0;
  itemsPerPage = 3;
  private autoSlideSub: Subscription | undefined;
  isMobileView = false;
  screenWidth = window.innerWidth;

  ngOnInit(): void {
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    if (this.autoSlideSub) {
      this.autoSlideSub.unsubscribe();
    }
  }

  startAutoSlide(): void {
    this.autoSlideSub = interval(5000).subscribe(() => {
      this.nextPage();
    });
  }

  get totalPages(): number {
    return Math.ceil(this.testimonials.length / this.itemsPerPage);
  }

  get visibleTestimonials(): Testimonial[] {
    const startIndex = this.currentPage * this.itemsPerPage;
    return this.testimonials.slice(startIndex, startIndex + this.itemsPerPage);
  }

  goToPage(pageIndex: number): void {
    this.currentPage = pageIndex;
    // Reset the timer when manually changing page
    if (this.autoSlideSub) {
      this.autoSlideSub.unsubscribe();
    }
    this.startAutoSlide();
  }

  nextPage(): void {
    this.currentPage = (this.currentPage + 1) % this.totalPages;
  }

  previousPage(): void {
    this.currentPage = (this.currentPage - 1 + this.totalPages) % this.totalPages;
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.screenWidth = window.innerWidth;
    this.isMobileView = this.screenWidth < 768;
    this.itemsPerPage = this.isMobileView ? 1 : 3;
    
    // Reset to first page when changing view mode to avoid out-of-bounds
    if (this.currentPage >= this.totalPages) {
      this.currentPage = 0;
    }
  }
}

