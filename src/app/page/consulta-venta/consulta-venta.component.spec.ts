import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaVentaComponent } from './consulta-venta.component';

describe('ConsultaVentaComponent', () => {
  let component: ConsultaVentaComponent;
  let fixture: ComponentFixture<ConsultaVentaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaVentaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
