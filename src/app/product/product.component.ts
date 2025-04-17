import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import productsData from '../product/products.json';
import { FormsModule } from '@angular/forms';
import { fakeAsync } from '@angular/core/testing';

interface Product {
  name: string;
  image: string;
  category: string;
  route: string;
}

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, FormsModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: any[] = [];
  categories: any[] = [];
  filteredProducts: Product[] = [];
  selectedCategories: Set<string> = new Set();
  searchQuery: string = '';
  noResultsFound: boolean = false;
  loading: boolean = true;

  ngOnInit() {
    this.products = productsData.products;
    this.categories = productsData.categories;
    this.filteredProducts = [...this.products];
    this.fetchProducts();
  }
  isFilterVisible: boolean = false;

toggleFilter() {
  this.isFilterVisible = !this.isFilterVisible;
}

  fetchProducts() {
    // Simulating API call delay
    setTimeout(() => {
      this.loading = false; // Hide loader after data is loaded
    }, 2000);
  }
  toggleCategory(category: string) {
    if (this.selectedCategories.has(category)) {
      this.selectedCategories.delete(category);
    } else {
      this.selectedCategories.add(category);
    }
    this.filterProducts(); // Ensure search + category filtering works together
  }


  filterProducts() {
    let filtered = [...this.products];

    if (this.selectedCategories.size > 0) {
      filtered = filtered.filter(product => this.selectedCategories.has(product.category));
    }

    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    }

    this.filteredProducts = filtered;
    this.noResultsFound = this.filteredProducts.length === 0;
  }


  resetFilters() {
    this.selectedCategories.clear();
    this.searchQuery = ''; // Reset search input
    this.filterProducts();
  }


  searchProducts() {
    const query = this.searchQuery.trim().toLowerCase();

    if (!query) {
      this.filteredProducts = [...this.products];
      this.noResultsFound = false;
      return;
    }

    this.filteredProducts = this.products.filter(product =>
      product?.name?.toLowerCase().includes(query) ||
      product?.category?.toLowerCase().includes(query)
    );

    this.noResultsFound = this.filteredProducts.length === 0;
  }

}
