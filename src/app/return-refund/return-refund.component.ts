import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-return-refund',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, RouterLink],
  templateUrl: './return-refund.component.html',
  styleUrl: './return-refund.component.css'
})
export class ReturnRefundComponent {
  imageUrl:string='assets/icon/search-icon.svg';
  searchQuery: string = '';
  message: string = '';
  showMessage: boolean = false;
  private timeoutId: any = null;

  onSearchChange(){}
  subscribe() {
    if (this.timeoutId) clearTimeout(this.timeoutId);
    
    this.message = 'Subscribed Successfully';
    this.showMessage = true;

    this.timeoutId = setTimeout(() => {
      this.showMessage = false;
    }, 3000);
  }

}
