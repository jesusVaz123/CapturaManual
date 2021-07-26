import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetalleComponent } from './modal-detalle.component';

describe('ModalDetalleComponent', () => {
  let component: ModalDetalleComponent;
  let fixture: ComponentFixture<ModalDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
