import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrl: './list-order.component.css'
})
export class ListOrderComponent implements OnInit {
  orders: any[] = [];
  totalRecords = 0;
  pageSize = 10;
  currentPage = 1;
  searchKeyword = '';
  statusFilter = '';

  Math = Math;

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    const searchParams = {
      PageNumber: this.currentPage,
      PageSize: this.pageSize,
      Keyword: this.searchKeyword,
      Status: this.statusFilter,
      SortBy: '',
      SortDir: ''
    };

    this.orderService.searchOrders(searchParams).subscribe(response => {
      this.orders = response.data;
      this.totalRecords = response.totalRecords;
    }, error => {
      console.error('Error loading orders', error);
    });
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= Math.ceil(this.totalRecords / this.pageSize)) {
      this.currentPage = page;
      this.loadOrders();
    }
  }

  onSearch() {
    this.currentPage = 1;
    this.loadOrders();
  }
}