import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteTrailerComponent } from './reporte-trailer.component';

describe('ReporteTrailerComponent', () => {
  let component: ReporteTrailerComponent;
  let fixture: ComponentFixture<ReporteTrailerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteTrailerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteTrailerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
