import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterviewUserComponent } from './masterview-user.component';

describe('MasterviewUserComponent', () => {
  let component: MasterviewUserComponent;
  let fixture: ComponentFixture<MasterviewUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MasterviewUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MasterviewUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
