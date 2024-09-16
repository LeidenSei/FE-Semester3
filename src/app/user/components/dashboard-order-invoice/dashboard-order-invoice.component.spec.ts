import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardOrderInvoiceComponent } from './dashboard-order-invoice.component';

describe('DashboardOrderInvoiceComponent', () => {
  let component: DashboardOrderInvoiceComponent;
  let fixture: ComponentFixture<DashboardOrderInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardOrderInvoiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardOrderInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
