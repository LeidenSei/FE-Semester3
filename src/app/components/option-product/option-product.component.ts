import { Component } from '@angular/core';
import { AttributeOptionService } from '../../services/attribute-option.service';

@Component({
  selector: 'app-option-product',
  templateUrl: './option-product.component.html',
  styleUrl: './option-product.component.css'
})
export class OptionProductComponent {
  options: any[] = [];
  totalRecords = 0;
  pageSize = 10;
  currentPage = 1;
  searchKeyword = '';
  statusFilter = '';

  Math = Math;

  constructor(private attributeOptionService: AttributeOptionService) {}

  ngOnInit() {
    this.loadOptions();
  }

  loadOptions() {
    const searchParams = {
      PageNumber: this.currentPage,
      PageSize: this.pageSize,
      Keyword: this.searchKeyword,
      Status: this.statusFilter,
      SortBy: '',
      SortDir: ''
    };

    this.attributeOptionService.searchAttributeOptions(searchParams).subscribe(response => {
      this.options = response.data;
      this.totalRecords = response.totalRecords;
    }, error => {
      console.error('Error loading options', error);
    });
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= Math.ceil(this.totalRecords / this.pageSize)) {
      this.currentPage = page;
      this.loadOptions();
    }
  }

  onSearch() {
    this.currentPage = 1;
    this.loadOptions();
  }

  deleteOption(id: number): void {
    if (confirm('Are you sure you want to delete this option?')) {
      this.attributeOptionService.deleteAttributeOption(id).subscribe(
        response => {
          console.log('Option deleted:', response);
          this.loadOptions();
        },
        error => {
          console.error('Error deleting option:', error);
        }
      );
    }
  }
}
