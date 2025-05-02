import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, FormsModule],
  templateUrl: './privacy.component.html',
  styleUrl: './privacy.component.css'
})
export class PrivacyComponent {
  imageUrl: string = 'assets/icon/search-icon.svg';
  searchQuery: string = '';
  message: string = '';
  showMessage: boolean = false;
  private timeoutId: any = null;


  onSearchChange() {
  }

  subscribe() {
    if (this.timeoutId) clearTimeout(this.timeoutId);
    
    this.message = 'Subscribed Successfully';
    this.showMessage = true;

    this.timeoutId = setTimeout(() => {
      this.showMessage = false;
    }, 3000);
  }
}