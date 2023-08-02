import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchHomeComponent } from './batch-home.component';

describe('BatchHomeComponent', () => {
  let component: BatchHomeComponent;
  let fixture: ComponentFixture<BatchHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
