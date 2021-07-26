import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalOpcionesComponent } from './modal-opciones.component';

describe('ModalOpcionesComponent', () => {
  let component: ModalOpcionesComponent;
  let fixture: ComponentFixture<ModalOpcionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalOpcionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalOpcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
