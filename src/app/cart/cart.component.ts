import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { CartService } from './cart.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink,FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  totalPrice = 0;
  
  constructor(private cartService: CartService) {}
  
  ngOnInit() {
    this.cartItems = this.cartService.getCart();
    this.calculateTotal();
    
    // Subscribe to cart changes
    this.cartService.getCartObservable().subscribe(items => {
      this.cartItems = items;
      this.calculateTotal();
    });
  }
  
  calculateTotal() {
    this.totalPrice = this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }
  
  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      this.cartService.updateQuantity(item, item.quantity - 1);
    }
  }
  
  increaseQuantity(item: any) {
    this.cartService.updateQuantity(item, item.quantity + 1);
  }
  
  clearCart() {
    this.cartService.clearCart();
  }
  
  buy() {
    this.cartService.buyProduct(this.totalPrice);
  }
}