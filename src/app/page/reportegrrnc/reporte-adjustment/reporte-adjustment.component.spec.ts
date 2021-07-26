import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteAdjustmentComponent } from './reporte-adjustment.component';

describe('ReporteAdjustmentComponent', () => {
  let component: ReporteAdjustmentComponent;
  let fixture: ComponentFixture<ReporteAdjustmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteAdjustmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteAdjustmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
