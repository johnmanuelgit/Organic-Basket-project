import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import productsData from '../devgad/products.json';
import { CartService } from '../../../cart/cart.service';

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

  
  constructor(private cartService: CartService) {}

  addToCart(product: any, quantity: number) {
    // Make sure we have a valid product
    if (!product) {
      console.error('Product is undefined or null');
      return;
    }
    
    const item = {
      name: product.name,
      image: product.image,
      price: this.price, // Use the component price instead of hardcoded value
      quantity: this.quantity, // Use the component quantity instead of parameter
    };
    
    this.cartService.addToCart(item);
    alert(`${product.name} added to cart!`); // Fixed template string syntax
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

}
