import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-recipes',
  imports: [CommonModule,FormsModule,RouterModule,RouterLink],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent {
  recipeCategories = [
    { name: 'All Recipes', active: true },
    { name: 'Dessert', active: false },
    { name: 'Drinks', active: false },
    { name: 'Refreshment', active: false }
  ];

  allRecipes = [
    { name: 'Mango Wine', image: 'assets/image/recipe-1.webp', category: 'drinks' },
    { name: 'Aamras', image: 'assets/image/recipe-2.webp', category: 'dessert' },
    { name: 'Mango Kulfi', image: 'assets/image/recipe-3.webp', category: 'dessert,refreshment' },
    { name: 'Aam Panna', image: 'assets/image/recipe-4.webp', category: 'refreshment' }
  ];

  recipes = [...this.allRecipes];
  subscriptionMessage: string = '';

  selectCategory(index: number): void {
    this.recipeCategories.forEach((category, i) => {
      category.active = i === index;
    });

    const selected = this.recipeCategories[index].name.toLowerCase();

    this.recipes = selected === 'all recipes'
      ? [...this.allRecipes]
      : this.allRecipes.filter(recipe =>
          recipe.category.toLowerCase().includes(selected)
        );
  }

  subscribeToNewsletter(event: Event, emailForm: any): void {
    event.preventDefault();
    if (emailForm.valid) {
      console.log('Subscribed with:', emailForm.value);
      this.subscriptionMessage = 'Subscribed successfully!';
      emailForm.resetForm(); // Optional: Clear the form
      setTimeout(() => {
        this.subscriptionMessage = ''; // Auto-hide message after 5 seconds
      }, 5000);
    }
  }
}
