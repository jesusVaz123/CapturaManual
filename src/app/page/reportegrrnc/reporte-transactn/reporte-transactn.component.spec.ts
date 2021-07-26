import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteTransactnComponent } from './reporte-transactn.component';

describe('ReporteTransactnComponent', () => {
  let component: ReporteTransactnComponent;
  let fixture: ComponentFixture<ReporteTransactnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteTransactnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteTransactnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
