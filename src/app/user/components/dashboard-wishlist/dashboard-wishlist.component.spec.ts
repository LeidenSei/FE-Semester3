import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardWishlistComponent } from './dashboard-wishlist.component';

describe('DashboardWishlistComponent', () => {
  let component: DashboardWishlistComponent;
  let fixture: ComponentFixture<DashboardWishlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardWishlistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardWishlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
