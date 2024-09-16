import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardInfoEditComponent } from './dashboard-info-edit.component';

describe('DashboardInfoEditComponent', () => {
  let component: DashboardInfoEditComponent;
  let fixture: ComponentFixture<DashboardInfoEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardInfoEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardInfoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
