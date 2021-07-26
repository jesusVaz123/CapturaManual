import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteChargebackComponent } from './reporte-chargeback.component';

describe('ReporteChargebackComponent', () => {
  let component: ReporteChargebackComponent;
  let fixture: ComponentFixture<ReporteChargebackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteChargebackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteChargebackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
