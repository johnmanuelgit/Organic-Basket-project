import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-page',
  standalone:true,
  imports: [CommonModule,RouterModule,RouterLink],
  templateUrl:'./page.component.html',
  styleUrl: './page.component.css'
})
export class PageComponent implements OnInit{
  imageUrl:string='assets/icon/search-icon.svg';
  blog: any;
  imageUrls: string = '';
  pagetitle:string='';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    const blogId = Number(this.route.snapshot.paramMap.get('id'));

    this.http.get<any[]>('assets/blogs.json').subscribe(blogs => {
      this.blog = blogs.find(blog => blog.id === blogId);
    });

  
    this.http.get<any[]>('assets/blogpage.json').subscribe(details => {
      const blogDetail = details.find(detail => detail.id === blogId);
      if (blogDetail) {
        this.imageUrls = blogDetail.image;
        this.pagetitle=blogDetail.pagetitle
      }
    });
  }
}
