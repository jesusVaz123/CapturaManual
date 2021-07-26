import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallerechazosModalComponent } from './detallerechazos-modal.component';

describe('DetallerechazosModalComponent', () => {
  let component: DetallerechazosModalComponent;
  let fixture: ComponentFixture<DetallerechazosModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallerechazosModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallerechazosModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
