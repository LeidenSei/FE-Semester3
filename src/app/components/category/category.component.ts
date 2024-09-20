import { Component } from '@angular/core';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  categories: any[] = [];
  totalRecords = 0;
  pageSize = 10;
  currentPage = 1;
  searchKeyword = '';
  statusFilter = '';

  Math = Math;

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.loadCategories();
  }
  loadCategories() {
    const searchParams = {
      PageNumber: this.currentPage,
      PageSize: this.pageSize,
      Keyword: this.searchKeyword,
      Status: this.statusFilter,
      SortBy: '',
      SortDir: ''
    };
  
    this.categoryService.searchCategories(searchParams).subscribe(response => {
      this.categories = response.data;
      this.totalRecords = response.totalRecords;
    }, error => {
      console.error('Error loading categories', error);
    });
  }
  
  onPageChange(page: number): void {
    if (page >= 1 && page <= Math.ceil(this.totalRecords  / this.pageSize)) {
      this.currentPage = page;
      this.loadCategories();
    }
  }
  onSearch() {
    this.currentPage = 1;
    this.loadCategories();
  }
  deleteCategory(id: number): void {
    this.categoryService.checkCategoryHasProducts(id).subscribe(
      hasProducts => {
        if (hasProducts) {
          alert('Cannot delete category because it contains products.');
        } else {
          if (confirm('Are you sure you want to delete this category?')) {
            this.categoryService.deleteCategory(id).subscribe(
              response => {
                console.log('Category deleted:', response);
                this.loadCategories();
              },
              error => {
                console.error('Error deleting category:', error);
              }
            );
          }
        }
      },
      error => {
        console.error('Error checking category for products:', error);
      }
    );
  }
}