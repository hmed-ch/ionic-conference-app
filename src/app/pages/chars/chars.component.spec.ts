import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharsComponent } from './chars.component';

describe('CharsComponent', () => {
  let component: CharsComponent;
  let fixture: ComponentFixture<CharsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharsComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
