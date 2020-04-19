import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankmodalComponent } from './bankmodal.component';

describe('BankmodalComponent', () => {
  let component: BankmodalComponent;
  let fixture: ComponentFixture<BankmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankmodalComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
