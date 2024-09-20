import { Component } from '@angular/core';
import { PostCategoryService } from '../../services/post-category.service';
import { PostCategory } from '../../interfaces/post-category';
@Component({
  selector: 'app-post-category',
  templateUrl: './post-category.component.html',
  styleUrl: './post-category.component.css'
})
export class PostCategoryComponent {
  postCategories: any;
  totalRecords = 0;
  pageSize = 10;
  currentPage = 1;
  searchKeyword = '';
  statusFilter = '';

  Math = Math;

  constructor(private postCategoryService: PostCategoryService) {}

  ngOnInit() {
    this.loadPostCategories();
  }

  loadPostCategories() {
    const searchParams = {
      PageNumber: this.currentPage,
      PageSize: this.pageSize,
      Keyword: this.searchKeyword,
      Status: this.statusFilter,
      SortBy: '',
      SortDir: ''
    };
  
    this.postCategoryService.searchPostCategories(searchParams).subscribe(
      response => {
        this.postCategories = response.data; 
        this.totalRecords = this.postCategories.length;
      },
      error => {
        console.error('Error loading post categories', error);
      }
    );
  }
  

  onPageChange(page: number): void {
    if (page >= 1 && page <= Math.ceil(this.totalRecords / this.pageSize)) {
      this.currentPage = page;
      this.loadPostCategories();
    }
  }

  onSearch() {
    this.currentPage = 1;
    this.loadPostCategories();
  }

  deletePostCategory(id: number): void {
    this.postCategoryService.checkPostCategoryHasPosts(id).subscribe(
      hasPosts => {
        if (hasPosts) {
          alert('Cannot delete post category because it contains posts.');
        } else {
          if (confirm('Are you sure you want to delete this post category?')) {
            this.postCategoryService.deletePostCategory(id).subscribe(
              response => {
                console.log('Post category deleted:', response);
                this.loadPostCategories();
              },
              error => {
                console.error('Error deleting post category:', error);
              }
            );
          }
        }
      },
      error => {
        console.error('Error checking post category for posts:', error);
      }
    );
  }
}