import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { CartService } from './cart.service';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  totalPrice = 0;
  userId: string = '';
  isLoading: boolean = true;

  constructor(private cartService: CartService, private http: HttpClient) {}

  ngOnInit() {
    // Get user details first
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      this.userId = user._id;
    } else {
      console.error('User not found in localStorage');
      this.userId = '';
    }
    
    // Subscribe to cart changes
    this.cartService.getCartObservable().subscribe(items => {
      this.cartItems = items;
      this.calculateTotal();
      this.isLoading = false;
    });

    // Try to fetch from backend first if user is logged in
    if (this.userId) {
      this.cartService.fetchCartFromBackend().subscribe({
        next: (items: any) => {
          if (items && items.length > 0) {
            this.cartItems = items;
            this.calculateTotal();
          } else {
            // If no items in backend, use local storage
            this.cartItems = this.cartService.getCart();
            this.calculateTotal();
          }
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error fetching cart', err);
          // Fallback to local storage
          this.cartItems = this.cartService.getCart();
          this.calculateTotal();
          this.isLoading = false;
        }
      });
    } else {
      // No user logged in, use local storage
      this.cartItems = this.cartService.getCart();
      this.calculateTotal();
      this.isLoading = false;
    }
  }

  calculateTotal() {
    this.totalPrice = this.cartItems.reduce(
      (total, item) => total + item.price * item.quantity, 
      0
    );
  }

  buy() {
    this.cartService.buyProduct(this.totalPrice);
  }

  increaseQuantity(item: any) {
    item.quantity += 1;
    this.cartService.updateQuantity(item, item.quantity);
    this.calculateTotal();
  }
  
  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity -= 1;
      this.cartService.updateQuantity(item, item.quantity);
      this.calculateTotal();
    } else {
      // Remove item if quantity drops to 0
      this.removeItem(item);
    }
  }
  
  removeItem(item: any) {
    this.cartService.removeItem(item.name);
    this.calculateTotal();
  }

  clearCart() {
    this.cartService.clearCart();
  }
}