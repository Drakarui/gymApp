import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSuscriptionComponent } from './add-suscription.component';

describe('AddSuscriptionComponent', () => {
  let component: AddSuscriptionComponent;
  let fixture: ComponentFixture<AddSuscriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSuscriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSuscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
