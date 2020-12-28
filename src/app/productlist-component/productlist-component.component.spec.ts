import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductlistComponentComponent } from './productlist-component.component';

describe('ProductlistComponentComponent', () => {
  let component: ProductlistComponentComponent;
  let fixture: ComponentFixture<ProductlistComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductlistComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductlistComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
