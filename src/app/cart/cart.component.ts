import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
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
  }

  calculateTotal() {
    this.totalPrice = this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  clearCart() {
    this.cartService.clearCart();
    this.cartItems = [];
    this.totalPrice = 0;
  }
}