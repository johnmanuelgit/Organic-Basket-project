import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import productsData from '../devgad/products.json';
import { CartService } from '../../../cart/cart.service';
import { HttpClient } from '@angular/common/http';
declare var Razorpay: any;

@Component({
  selector: 'app-goa-mankurad',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, RouterLink],
  templateUrl: './goa-mankurad.component.html',
  styleUrl: './goa-mankurad.component.css'
})
export class GoaMankuradComponent implements OnInit, OnDestroy {
  products: any[] = [];
  quantity = 1;
  price = 2499;
  currentStartIndex = 0;
  interval: any;
  isOpen = false;
  filteredProducts: any[] = [];
  selectedWeek: string | null = null;
  grades: string[] = ['A1', 'A2', 'A3'];
  selectedGrade: string = '';

  
  constructor(private cartService: CartService, private http:HttpClient) {}

  addToCart(product: any, quantity: number) {
    const token = localStorage.getItem('token');
  
    if (!token) {
      alert('Please login to add products to the cart.');
      return;
    }
  
    if (!product) {
      console.error('Product is undefined or null');
      return;
    }
  
    const item = {
      name: product.name,
      image: product.image,
      price: this.price,
      quantity: quantity,
    };

    this.cartService.addToCart(item);
    alert(`${product.name} added to cart!`);
  }
  
  selectGrade(grade: string) {
    this.selectedGrade = grade;
  }
  ngOnInit() {
    this.products = productsData.products;
    this.filteredProducts = [...this.products]; // Initialize filteredProducts
    
    // Auto-pagination every 3 seconds
    this.interval = setInterval(() => {
      this.nextSet();
    }, 3000);
  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  // Navigate to the next product
  nextProduct() {
    this.currentStartIndex = (this.currentStartIndex + 1) % this.products.length;
  }

  // Decrease quantity
  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  // Increase quantity
  increaseQuantity() {
    this.quantity++;
  }
  selectWeek(week: string) {
    this.selectedWeek = week; // Update the selected week
    this.isOpen = false; // Close the dropdown
  }
  // Toggle dropdown menu
  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  // Move to the next set of 4 products
  nextSet() {
    if (this.currentStartIndex + 4 < this.products.length) {
      this.currentStartIndex += 4;
    } else {
      this.currentStartIndex = 0; // Loop back to start
    }
  }

  // Move to the previous set of 4 products
  prevSet() {
    if (this.currentStartIndex - 4 >= 0) {
      this.currentStartIndex -= 4;
    } else {
      this.currentStartIndex = Math.max(this.products.length - 4, 0); // Go to last set if available
    }
  }

  // Get the current 4 visible products
  getVisibleProducts() {
    return this.products.slice(this.currentStartIndex, this.currentStartIndex + 4);
  }
isOpens:boolean=false
  toggleFAQ() {
    this.isOpens = !this.isOpens;
  }
  buyProduct(){
    const amount =this.price*this.quantity;
    this.http.post<any>('https://bakendrepo.onrender.com/payment/create-order',{
      amount:amount,
      currency:'INR'
    }).subscribe(order=>{
      const options = {
        key:'rzp_test_QIN4sfPHDDt9hq',
        amount:order.amount,
        currency:order.currency,
        name:'John Manuvel',
        description:'Welcome',
        order_id:order.id,
        handler:(response:any)=>{
          console.log('Payment Successfull!',response);
          alert('Payment Successfull!');
        },
        prefill:{
          name:'John Manuvel',
          email:'sjohnmanuelpc@gmail.com',
          contact:'1234567890'
        },
        theme:{
          color:'#3399cc'
        }
      };

      const rzp = new Razorpay(options);
      rzp.open();},
      error =>{
        console.error('Order creation failed', error);
    })
  }
}
